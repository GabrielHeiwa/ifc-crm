import { useQuery } from "@tanstack/react-query";
import { Loader2Icon, PencilIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
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
import { CreateUserDialog } from "./dialogs/create";
import { DeleteUserDialog } from "./dialogs/delete";
import { useUserStore } from "./users.store";
import { UpdateUserDialog } from "./dialogs/update";

export function Users() {
	// Hooks
	const {
		setUserSelected,
		setCreateUserDialogVisible,
		createUserDialogVisible,
		setEditUserDialogVisible,
		editUserDialogVisible,
		setDeleteUserDialogVisible,
		deleteUserDialogVisible,
	} = useUserStore();

	// Queries
	const { data, isLoading } = useQuery({
		queryKey: ["get-users"],
		queryFn: () => api.get("/users"),
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
			{createUserDialogVisible && <CreateUserDialog />}

			{deleteUserDialogVisible && <DeleteUserDialog />}

			{editUserDialogVisible && <UpdateUserDialog />}

			<div className='flex flex-row justify-end'>
				<Button
					variant={"ghost"}
					onClick={() => setCreateUserDialogVisible(true)}
				>
					<PlusIcon className='w-6 h-6' />
					Novo Usuário
				</Button>
			</div>

			<Table>
				<TableCaption>Listagem de usuários</TableCaption>
				<TableHeader className='bg-gray-900'>
					<TableRow>
						<TableHead className='text-white'>ID</TableHead>
						<TableHead className='text-white'>E-mail</TableHead>
						<TableHead className='text-white'>
							Tipo de usuário
						</TableHead>
						<TableHead className='text-white'></TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{data?.data.map((user: any) => {
						return (
							<TableRow>
								<TableCell>{user.id}</TableCell>

								<TableCell>{user.email}</TableCell>

								<TableCell>
									<Badge>
										{user.Client.length > 0
											? "Cliente"
											: user.Supplier.length > 0
											? "Fornecedor"
											: "Usuário"}
									</Badge>
								</TableCell>

								<TableCell className='flex flex-row justify-end gap-x-1'>
									<Toggle
										className='hover:text-blue-200 hover:bg-blue-600'
										onClick={() => {
											setUserSelected(user);
											setEditUserDialogVisible(true);
										}}
									>
										<PencilIcon className='w-6 h-6' />
									</Toggle>

									<Toggle
										className='hover:text-red-200 hover:bg-red-600'
										onClick={() => {
											setUserSelected(user);
											setDeleteUserDialogVisible(true);
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
