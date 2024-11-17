import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { useUserStore } from "../users.store";
import { useRef } from "react";
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/api";
import { toast } from "sonner";
import { queryClient } from "@/routes";

export function UpdateUserDialog() {
	// Hooks
	const { editUserDialogVisible, setEditUserDialogVisible, userSelected } =
		useUserStore();
	const form = useForm({
		defaultValues: {
			email: userSelected?.email,
			password: userSelected?.password,
			userType: userSelected?.Supplier.length
				? "SUPPLIER"
				: userSelected?.Client.length
				? "CLIENT"
				: "USER",
			cnpj: userSelected?.Supplier.length
				? userSelected.Supplier[0].cnpj
				: undefined,
			cpf: userSelected?.Client.length
				? userSelected.Client[0].cpf
				: undefined,
		},
	});

	// Refs
	const formRef = useRef<HTMLFormElement | null>(null);

	// Mutations
	const updateUser = useMutation({
		mutationFn: (data: any) =>
			api.patch("/users/" + userSelected?.id, data),
		mutationKey: ["update-users"],
	});

	// Functions
	async function onSubmit(data: any) {
		try {
			await updateUser.mutateAsync(data);

			await queryClient.invalidateQueries({
				queryKey: ["get-users"],
			});

			toast.success("Usuário atualizado com sucesso");
		} catch (e: any) {
			console.error("Users => UpdateDialog => Submit", e);
			toast.error("Houve um erro ao atualizar o usuário");
		} finally {
			setEditUserDialogVisible(false);
		}
	}

	return (
		<Dialog
			open={editUserDialogVisible}
			onOpenChange={setEditUserDialogVisible}
		>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Editar usuário</DialogTitle>
					<DialogDescription>
						Está ação modificará o usuário
					</DialogDescription>
				</DialogHeader>

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						ref={formRef}
					>
						<FormField
							name='email'
							control={form.control}
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
							name='password'
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Senha</FormLabel>
									<FormControl>
										<Input
											placeholder='Senha'
											readOnly={true}
											disabled={true}
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
											disabled={true}
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
					<Button
						variant={"ghost"}
						onClick={() => setEditUserDialogVisible(false)}
					>
						Cancelar
					</Button>
					<Button onClick={() => formRef.current?.requestSubmit()}>
						Alterar
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
