"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMe, useUpdateName } from "@/hooks/use-auth";
import { updateNameSchema, type UpdateNameInput } from "@/lib/validation";
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
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export function ProfileForm() {
  const { data: user } = useMe();
  const updateName = useUpdateName();

  const form = useForm<UpdateNameInput>({
    resolver: zodResolver(updateNameSchema),
    values: { name: user?.name ?? "" },
  });

  function onSubmit(values: UpdateNameInput) {
    updateName.mutate(values.name);
  }

  if (!user) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Profile</CardTitle>
        <CardDescription>Update your display name.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="settings-email">Email</FieldLabel>
              <Input id="settings-email" value={user.email} disabled />
            </Field>

            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="settings-name">Name</FieldLabel>
                  <Input
                    {...field}
                    id="settings-name"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {updateName.isError && (
              <p className="text-sm text-destructive">
                {updateName.error instanceof ApiError
                  ? updateName.error.message
                  : "Something went wrong."}
              </p>
            )}
            {updateName.isSuccess && (
              <p className="text-sm text-emerald-600 dark:text-emerald-400">
                Saved.
              </p>
            )}

            <Button type="submit" disabled={updateName.isPending}>
              {updateName.isPending ? "Saving..." : "Save changes"}
            </Button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
