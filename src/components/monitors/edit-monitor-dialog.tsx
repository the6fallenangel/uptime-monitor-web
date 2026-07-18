"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateMonitor } from "@/hooks/use-monitors";
import { editMonitorSchema, type EditMonitorInput } from "@/lib/validation";
import { ApiError } from "@/lib/api";
import type { Monitor } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { nanosecondsToValueUnit } from "@/lib/format";

export function EditMonitorDialog({
  monitor,
  open,
  onOpenChange,
}: {
  monitor: Monitor;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const updateMonitor = useUpdateMonitor();
  const initial = nanosecondsToValueUnit(monitor.interval);

  const form = useForm<EditMonitorInput>({
    resolver: zodResolver(editMonitorSchema),
    defaultValues: {
      name: monitor.name,
      intervalValue: initial.value,
      intervalUnit: initial.unit,
    },
  });

  function onSubmit(values: EditMonitorInput) {
    updateMonitor.mutate(
      {
        id: monitor.id,
        data: {
          name: values.name,
          interval: `${values.intervalValue}${values.intervalUnit}`,
        },
      },
      {
        onSuccess: () => onOpenChange(false),
      },
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit monitor</DialogTitle>
          <DialogDescription>
            Update the name or check interval. The URL can&apos;t be changed
            after creation.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="edit-monitor-name">Name</FieldLabel>
                  <Input
                    {...field}
                    id="edit-monitor-name"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <div className="flex gap-2">
              <Controller
                name="intervalValue"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="flex-1">
                    <FieldLabel htmlFor="edit-monitor-interval-value">
                      Check every
                    </FieldLabel>
                    <Input
                      {...field}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      id="edit-monitor-interval-value"
                      type="number"
                      min={1}
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="intervalUnit"
                control={form.control}
                render={({ field }) => (
                  <Field className="flex-1">
                    <FieldLabel htmlFor="edit-monitor-interval-unit">
                      Unit
                    </FieldLabel>
                    <Select
                      name={field.name}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger id="edit-monitor-interval-unit">
                        <SelectValue>
                          {(value) => {
                            const labels = {
                              s: "Seconds",
                              m: "Minutes",
                              h: "Hours",
                            };

                            return labels[value as keyof typeof labels];
                          }}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="s">Seconds</SelectItem>
                        <SelectItem value="m">Minutes</SelectItem>
                        <SelectItem value="h">Hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                )}
              />
            </div>

            {updateMonitor.isError && (
              <p className="text-sm text-destructive">
                {updateMonitor.error instanceof ApiError
                  ? updateMonitor.error.message
                  : "Something went wrong."}
              </p>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={updateMonitor.isPending}
            >
              {updateMonitor.isPending ? "Saving..." : "Save changes"}
            </Button>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}
