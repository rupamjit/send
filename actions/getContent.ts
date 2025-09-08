import { db } from "@/utils/db"

export const getContent = async(id:string) => {

    const data = await db.share.findFirst({
        where:{
            codeHash:id
        }
    })
    return data;
}

