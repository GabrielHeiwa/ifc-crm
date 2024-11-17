import {
	Dialog,
	DialogContent,
	DialogDescription,
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
import { Button } from "@/components/ui/button";
import React, { useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/api";
import { queryClient } from "@/routes";
import { toast } from "sonner";
import { useProductsStore } from "../products.store";

type CreateUserDialogProps = {};

type Props = React.PropsWithChildren<{}> & CreateUserDialogProps;

export function CreateProductDialog({}: Props) {
	// Hooks
	const form = useForm({
		defaultValues: {
			name: undefined,
			description: undefined,
			price: undefined,
		},
	});
	const { setCreateProductDialogVisible, createProductDialogVisible } =
		useProductsStore();

	// Refs
	const formRef = useRef<HTMLFormElement | null>(null);

	// Mutations
	const createNewProduct = useMutation({
		mutationFn: (data: any) => api.post("/products", data),
		mutationKey: ["create-new-product"],
	});

	// Functions
	async function onSubmit(data: any) {
		try {
			data.price = Number(data.price.replace(/\D/gm, '')) / 100;

			await createNewProduct.mutateAsync(data);

			queryClient.invalidateQueries({
				queryKey: ["get-products"],
			});

			toast.success("Novo produto criado.");
		} catch (e: any) {
			console.error("Product -> Create -> Dialog -> Submit", e);

			toast.error("Erro ao criar um novo produto");
		} finally {
			setCreateProductDialogVisible(false);
		}
	}

	return (
		<Dialog
			open={createProductDialogVisible}
			onOpenChange={setCreateProductDialogVisible}
		>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Criar produto</DialogTitle>
					<DialogDescription>
						Está ação criará um produto
					</DialogDescription>
				</DialogHeader>

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						ref={formRef}
					>
						<FormField
							name='name'
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nome</FormLabel>
									<FormControl>
										<Input
											placeholder='Nome'
											{...field}
										/>
									</FormControl>
									<FormDescription>
										Nome do usuário
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							name='description'
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Descrição</FormLabel>
									<FormControl>
										<Input
											placeholder='Descrição'
											{...field}
										/>
									</FormControl>
									<FormDescription>
										Descrição do produto
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='price'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Preço</FormLabel>
									<FormControl>
										<Input
											type='text'
											placeholder='Preço'
											{...field}
											onChange={(e) => {
												const digits = Number(
													e.target.value.replace(
														/\D/gm,
														""
													)
												);
												const currency =
													new Intl.NumberFormat(
														"pt-Br",
														{
															currency: "BRL",
															style: "currency",
														}
													).format(digits / 100);

												field.onChange(currency);
											}}
										/>
									</FormControl>
									<FormDescription>
										Preçco do produto
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
					</form>
				</Form>

				<DialogFooter>
					<Button
						variant={"ghost"}
						onClick={() => setCreateProductDialogVisible(false)}
					>
						Cancelar
					</Button>
					<Button onClick={() => formRef.current?.requestSubmit()}>
						Criar
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
