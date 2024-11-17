import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import React, { useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/api";
import { queryClient } from "@/routes";
import { toast } from "sonner";
import { useUserStore } from "../users.store";

type CreateUserDialogProps = {};

type Props = React.PropsWithChildren<{}> & CreateUserDialogProps;

export function CreateUserDialog({}: Props) {
	// Hooks
	const form = useForm({
		defaultValues: {
			email: undefined,
			password: undefined,
			userType: "USER",
			cpf: undefined,
			cnpj: undefined,
		},
	});
	const { setCreateUserDialogVisible, createUserDialogVisible } =
		useUserStore();

	// Refs
	const formRef = useRef<HTMLFormElement | null>(null);

	// Mutations
	const createNewUser = useMutation({
		mutationFn: (data: any) => api.post("/users", data),
		mutationKey: ["create-new-user"],
	});

	// Functions
	async function onSubmit(data: any) {
		try {
			await createNewUser.mutateAsync(data);

			queryClient.invalidateQueries({
				queryKey: ["get-users"],
			});

			toast.success("Novo usuário criado.");
		} catch (e: any) {
			console.error("User -> Create -> Dialog -> Submit", e);

			toast.error("Erro ao criar um novo usuário.");
		} finally {
            setCreateUserDialogVisible(false);
        }
	}

	return (
		<Dialog
			onOpenChange={setCreateUserDialogVisible}
			open={createUserDialogVisible}
		>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Novo usuário</DialogTitle>
				</DialogHeader>

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						ref={formRef}
					>
						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormLabel>E-mail</FormLabel>
									<FormControl>
										<Input
											placeholder='E-mail'
											{...field}
										/>
									</FormControl>
									<FormDescription>
										E-mail do usuário
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='password'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Senha</FormLabel>
									<FormControl>
										<Input
											placeholder='Senha'
											{...field}
										/>
									</FormControl>
									<FormDescription>
										Senha do usuário
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='userType'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Tipo do usuário</FormLabel>
									<FormControl>
										<Select
											defaultValue='USER'
											onValueChange={field.onChange}
											value={field.value}
											disabled={field.disabled}
											name={field.name}
										>
											<SelectTrigger>
												<SelectValue placeholder='Tipo de usuário' />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value='USER'>
													Usuário
												</SelectItem>
												<SelectItem value='CLIENT'>
													Cliente
												</SelectItem>
												<SelectItem value='SUPPLIER'>
													Forncedor
												</SelectItem>
											</SelectContent>
										</Select>
									</FormControl>
									<FormDescription>
										Tipo do usuário a criar
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						{form.watch("userType") === "CLIENT" ? (
							<FormField
								control={form.control}
								name='cpf'
								render={({ field }) => (
									<FormItem>
										<FormLabel>CPF</FormLabel>
										<FormControl>
											<Input
												placeholder='CPF'
												{...field}
											/>
										</FormControl>
										<FormDescription>
											CPF do usuário
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
						) : form.watch("userType") === "SUPPLIER" ? (
							<FormField
								control={form.control}
								name='cnpj'
								render={({ field }) => (
									<FormItem>
										<FormLabel>CNPJ</FormLabel>
										<FormControl>
											<Input
												placeholder='CNPJ'
												{...field}
											/>
										</FormControl>
										<FormDescription>
											CNPJ do usuário
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
						) : null}
					</form>
				</Form>

				<DialogFooter>
					<Button variant={"ghost"}>Cancelar</Button>
					<Button onClick={() => formRef.current?.requestSubmit()}>
						Criar
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
