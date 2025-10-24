// import type { TRPCClientErrorLike } from "@trpc/client";
// import type { TRPC_ERROR_CODE_KEY, TRPC_ERROR_CODE_NUMBER } from "@trpc/server";
// import { toast } from "sonner";
// import type { $ZodFlattenedError } from "zod/v4/core";

// type ErrorInput = TRPCClientErrorLike<{
//     input: unknown;
//     output: unknown;
//     transformer: true;
//     errorShape: {
//         data: {
//             zodError: $ZodFlattenedError<unknown, string> | null;
//             code: TRPC_ERROR_CODE_KEY;
//             httpStatus: number;
//             path?: string;
//             stack?: string;
//         };
//         message: string;
//         code: TRPC_ERROR_CODE_NUMBER;
//     };
// }>;

// export const displayTRPCError = (error: ErrorInput) => {
//     toast.error(error.shape?.code);
// };

// MAYBE will be used later
