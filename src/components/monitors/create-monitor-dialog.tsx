"use client";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useCreateMonitor } from "@/hooks/use-monitors";
import { createMonitorSchema, type CreateMonitorInput } from "@/lib/validation";
import { ApiError } from "@/lib/api";
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
  DialogTrigger,
} from "@/components/ui/dialog";

export function CreateMonitorDialog() {
  const [open, setOpen] = useState(false);
  const createMonitor = useCreateMonitor();

  const form = useForm<CreateMonitorInput>({
    resolver: zodResolver(createMonitorSchema),
    defaultValues: { name: "", url: "", intervalValue: 30, intervalUnit: "s" },
  });

  function onSubmit(values: CreateMonitorInput) {
    createMonitor.mutate(
      {
        name: values.name,
        url: values.url,
        interval: `${values.intervalValue}${values.intervalUnit}`,
      },
      {
        onSuccess: () => {
          setOpen(false);
          form.reset();
        },
      },
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={(props) => (
          <Button {...props}>
            <Plus className="mr-2 h-4 w-4" />
            Add monitor
          </Button>
        )}
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a monitor</DialogTitle>
          <DialogDescription>
            We&apos;ll check this URL at the interval you set and alert you on
            status changes.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="monitor-name">Name</FieldLabel>
                  <Input
                    {...field}
                    id="monitor-name"
                    placeholder="My API"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="url"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="monitor-url">URL</FieldLabel>
                  <Input
                    {...field}
                    id="monitor-url"
                    placeholder="https://example.com"
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
                    <FieldLabel htmlFor="monitor-interval-value">
                      Check every
                    </FieldLabel>
                    <Input
                      {...field}
                      id="monitor-interval-value"
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
                    <FieldLabel htmlFor="monitor-interval-unit">
                      Unit
                    </FieldLabel>
                    <Select
                      name={field.name}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger id="monitor-interval-unit">
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

            {createMonitor.isError && (
              <p className="text-sm text-destructive">
                {createMonitor.error instanceof ApiError
                  ? createMonitor.error.message
                  : "Something went wrong."}
              </p>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={createMonitor.isPending}
            >
              {createMonitor.isPending ? "Adding..." : "Add monitor"}
            </Button>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}
