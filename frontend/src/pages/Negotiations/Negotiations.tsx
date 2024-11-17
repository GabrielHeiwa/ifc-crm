import { api } from "@/api"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useQuery } from "@tanstack/react-query"
import { Loader2Icon } from "lucide-react";


export function Negotiations() {

    // Queries
    const { data, isLoading } = useQuery({
        queryKey: ['get-negotiations'],
        queryFn: () => api.get('negotiations')
    });

    if (isLoading) {
        return <div className="w-full h-full flex flex-row items-center justify-center gap-x-4">
            Carregando
            <Loader2Icon className="animate animate-spin" />
        </div>
    }


    return <div className="flex flex-col gap-y-2">
        <Accordion type="single" collapsible className="w-full">

            {
                data?.data.map((negotiation: any) => {

                    return <>
                        <AccordionItem value={negotiation.id}>
                            <AccordionTrigger>{negotiation.id} - {negotiation.description}</AccordionTrigger>
                            <AccordionContent>
                               <div className="grid grid-cols-">

                               </div>
                            </AccordionContent>
                        </AccordionItem>
                    </>
                })
            }
        </Accordion>
    </div>
}