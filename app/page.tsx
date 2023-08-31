import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Image from "next/image";
import { Database } from "@/types/supabase";
import noImg from "@/assets/imgs/noImg.jpg";

export default async function posts() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data: post, error } = await supabase.from("post").select(`
    id,
    post_text ( text, hashtags_Block ( content ) ),
    post_img ( img )
  `);

  return (
    <section className="flex h-screen items-center justify-center gap-10">
      {post?.map((post) => {
        return (
          <div key={post.id} className="w-80 bg-slate-50">
            <Image
              width={400}
              height={600}
              className="mb-5"
              alt=""
              src={post.post_img[0].img ?? noImg}
            ></Image>
            <p>{`${post.post_text[0].text} `}</p>
            <p className="text-sky-600">
              {post.post_text[0]?.hashtags_Block?.content ?? ""}
            </p>
          </div>
        );
      })}
    </section>
  );
}
