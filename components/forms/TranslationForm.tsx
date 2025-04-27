// "use client";
//
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { IKImage } from "imagekitio-next";
// import { Input } from "@/components/ui/input";
// import { useRouter } from "next/navigation";
// import { translationSchema } from "@/lib/validations";
// import { Textarea } from "@/components/ui/textarea";
// import { Button } from "@/components/ui/button";
// import { toast } from "sonner";
// import React from "react";
// import DisplayPeople from "@/components/DisplayPeople";
// import ImageUpload from "@/components/ImageUpload";
//
// const TranslationForm = ({
//   topics,
//   people,
// }: {
//   topics: string[];
//   people: string[];
// }) => {
//   const router = useRouter();
//   const form = useForm<z.infer<typeof translationSchema>>({
//     resolver: zodResolver(translationSchema),
//     defaultValues: {
//       url: "",
//       peopleIndexes: "-2",
//       newPeople: "",
//       topicIndex: "-2",
//       newTopic: "",
//       context: "",
//       secretCode: "",
//     },
//   });
//
//   const onSubmit = async (values: z.infer<typeof translationSchema>) => {
//     const result = await createTranslation(values);
//     if (result.success) {
//       toast.success("Translation requested successfully", {
//         description: "Translation is being processed",
//       });
//
//       router.push("/admin");
//     } else {
//       toast.error("Oops, something went wrong", {
//         description: result.message,
//       });
//     }
//   };
//   return (
//     <Form {...form}>
//       <form
//         onSubmit={form.handleSubmit(onSubmit)}
//         className="space-y-8 text-white "
//       >
//         <FormField
//           name="url"
//           control={form.control}
//           render={({ field }) => (
//             <FormItem className="flex flex-col gap-1">
//               <FormLabel className="text-base font-normal">Url:</FormLabel>
//               <FormControl>
//                 <Input required placeholder="Youtube link" {...field} />
//               </FormControl>
//             </FormItem>
//           )}
//         />
//         <FormField
//           name="peopleIndexes"
//           control={form.control}
//           render={({ field }) => (
//             <FormItem className="flex flex-col gap-1">
//               <FormLabel className="text-base font-normal">
//                 Person indexes:
//               </FormLabel>
//               <div className="bg-gray-600 text-white rounded-md p-1.5">
//                 {people.map((person, index) => (
//                   <p key={index}>{person}</p>
//                 ))}
//               </div>
//               <FormControl>
//                 <Input required {...field} />
//               </FormControl>
//             </FormItem>
//           )}
//         />
//
//         <FormField
//           name="newPeople"
//           control={form.control}
//           render={({ field }) => (
//             <FormItem className="flex flex-col gap-1">
//               <FormLabel className="text-base font-normal">
//                 New People:
//               </FormLabel>
//               <FormControl>
//                 <Input
//                   required
//                   {...field}
//                   placeholder="Person name - organization - (Optional context), ..."
//                   className="placeholder:text-amber-700"
//                 />
//               </FormControl>
//             </FormItem>
//           )}
//         />
//
//         <FormField
//           name="topicIndex"
//           control={form.control}
//           render={({ field }) => (
//             <FormItem className="flex flex-col gap-1">
//               <FormLabel className="text-base font-normal">
//                 Topic index:
//               </FormLabel>
//               <div className="bg-gray-600 text-white rounded-md p-1.5">
//                 {topics.map((topic, index) => (
//                   <p key={index}>{topic}</p>
//                 ))}
//               </div>
//               <FormControl>
//                 <Input
//                   required
//                   {...field}
//                   className="placeholder:text-amber-700"
//                 />
//               </FormControl>
//             </FormItem>
//           )}
//         />
//         <FormField
//           name="newTopic"
//           control={form.control}
//           render={({ field }) => (
//             <FormItem className="flex flex-col gap-1">
//               <FormLabel className="text-base font-normal">
//                 New Topic:
//               </FormLabel>
//               <FormControl>
//                 <Input
//                   required
//                   {...field}
//                   placeholder="less than 4 character counts as no new topic"
//                   className="placeholder:text-amber-700"
//                 />
//               </FormControl>
//             </FormItem>
//           )}
//         />
//
//         <FormField
//           name="topicImage"
//           control={form.control}
//           render={({ field }) => (
//             <FormItem className="flex flex-col gap-1">
//               <FormLabel className="text-base font-normal">
//                 Topic image:
//               </FormLabel>
//               <FormControl>
//                 <ImageUpload onFileChange={field.onChange} />
//               </FormControl>
//             </FormItem>
//           )}
//         />
//
//         <FormField
//           name="context"
//           control={form.control}
//           render={({ field }) => (
//             <FormItem className="flex flex-col gap-1">
//               <FormLabel className="text-base font-normal">Context:</FormLabel>
//               <FormControl>
//                 <Textarea
//                   required
//                   {...field}
//                   placeholder="less than 4 characters will be counted as no context given. Max 1000 characters"
//                   className="placeholder:text-amber-700"
//                 />
//               </FormControl>
//             </FormItem>
//           )}
//         />
//
//         <FormField
//           name="secretCode"
//           control={form.control}
//           render={({ field }) => (
//             <FormItem className="flex flex-col gap-1">
//               <FormLabel className="text-base font-normal">Code:</FormLabel>
//               <FormControl>
//                 <Input
//                   required
//                   {...field}
//                   placeholder="please give code"
//                   className="placeholder:text-amber-700"
//                 />
//               </FormControl>
//             </FormItem>
//           )}
//         />
//
//         <Button type="submit" className="bg-red-400 text-white">
//           Submit
//         </Button>
//       </form>
//     </Form>
//   );
// };
// export default TranslationForm;
