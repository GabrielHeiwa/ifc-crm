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
import { useProductsStore } from "../products.store";
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
import { useMutation } from "@tanstack/react-query";
import { api } from "@/api";
import { toast } from "sonner";
import { queryClient } from "@/routes";

export function UpdateProductDialog() {
	// Hooks
	const {
		editProductDialogVisible,
		setEditProductDialogVisible,
		productSelected,
	} = useProductsStore();

	const form = useForm({
		defaultValues: {
			name: productSelected?.name,
			description: productSelected?.description,
			price: new Intl.NumberFormat("pt-br", {
				currency: "BRL",
				style: "currency",
			}).format(productSelected?.price ?? 0),
		},
	});

	// Refs
	const formRef = useRef<HTMLFormElement | null>(null);

	// Mutations
	const updateUser = useMutation({
		mutationFn: (data: any) =>
			api.patch("/products/" + productSelected?.id, data),
		mutationKey: ["update-product"],
	});

	// Functions
	async function onSubmit(data: any) {
		try {
			data.price = Number(data.price.replace(/\D/gm, "")) / 100;

			await updateUser.mutateAsync(data);

			await queryClient.invalidateQueries({
				queryKey: ["get-products"],
			});

			toast.success("Produto atualizado com sucesso");
		} catch (e: any) {
			console.error("Products => UpdateDialog => Submit", e);
			toast.error("Houve um erro ao atualizar o produto");
		} finally {
			setEditProductDialogVisible(false);
		}
	}

	return (
		<Dialog
			open={editProductDialogVisible}
			onOpenChange={setEditProductDialogVisible}
		>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Editar produto</DialogTitle>
					<DialogDescription>
						Está ação modificará o produto
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
										Nome do produto
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
									<FormLabel>Preço do produto</FormLabel>
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
										Preço do produto
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
						onClick={() => setEditProductDialogVisible(false)}
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
