import { useQuery } from "@tanstack/react-query";
import { Loader2Icon, PencilIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { api } from "@/api";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Toggle } from "@/components/ui/toggle";
import { Button } from "@/components/ui/button";
import { CreateProductDialog } from "./dialogs/create";
import { DeleteProductDialog } from "./dialogs/delete";
import { UpdateProductDialog } from "./dialogs/update";
import { useProductsStore } from "./products.store";

export function Products() {
	// Hooks
	const {
		setProductSelected,
		createProductDialogVisible,
		setCreateProductDialogVisible,
		editProductDialogVisible,
		setEditProductDialogVisible,
		deleteProductDialogVisible,
		setDeleteProductDialogVisible,
	} = useProductsStore();

	// Queries
	const { data, isLoading } = useQuery({
		queryKey: ["get-products"],
		queryFn: () => api.get("/products"),
	});

	if (isLoading) {
		return (
			<div className='w-full h-full flex flex-row items-center justify-center gap-x-4'>
				Carregando
				<Loader2Icon className='animate animate-spin' />
			</div>
		);
	}

	return (
		<div className='flex flex-col gap-y-2'>
			{createProductDialogVisible && <CreateProductDialog />}

			{deleteProductDialogVisible && <DeleteProductDialog />}

			{editProductDialogVisible && <UpdateProductDialog />}

			<div className='flex flex-row justify-end'>
				<Button
					variant={"ghost"}
					onClick={() => setCreateProductDialogVisible(true)}
				>
					<PlusIcon className='w-6 h-6' />
					Novo Produto
				</Button>
			</div>

			<Table>
				<TableCaption>Listagem de produtos</TableCaption>
				<TableHeader className='bg-gray-900'>
					<TableRow>
						<TableHead className='text-white'>ID</TableHead>
						<TableHead className='text-white'>Nome</TableHead>
						<TableHead className='text-white'>Preço</TableHead>
						<TableHead className='text-white'></TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{data?.data
						.sort((a: any, b: any) => a.id.localeCompare(b.id))
						.map((product: any) => {
							return (
								<TableRow>
									<TableCell>{product.id}</TableCell>

									<TableCell>{product.name}</TableCell>

									<TableCell>
										{new Intl.NumberFormat("pt-BR", {
											style: "currency",
											currency: "BRL",
										}).format(product.price)}
									</TableCell>

									<TableCell className='flex flex-row justify-end gap-x-1'>
										<Toggle
											className='hover:text-blue-200 hover:bg-blue-600'
											onClick={() => {
												setProductSelected(product);
												setEditProductDialogVisible(
													true
												);
											}}
										>
											<PencilIcon className='w-6 h-6' />
										</Toggle>

										<Toggle
											className='hover:text-red-200 hover:bg-red-600'
											onClick={() => {
												setProductSelected(product);
												setDeleteProductDialogVisible(
													true
												);
											}}
										>
											<Trash2Icon className='w-6 h-6' />
										</Toggle>
									</TableCell>
								</TableRow>
							);
						})}
				</TableBody>
			</Table>
		</div>
	);
}
