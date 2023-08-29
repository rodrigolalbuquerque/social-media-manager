import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export default async function posts() {
  const supabase = createServerComponentClient({ cookies });

  const { data: post, error } = await supabase.from("post").select(`
    post_text ( text, hBlockId ( content ) ),
    post_img ( img )
  `);

  return (
    <section className="flex h-screen items-center justify-center gap-10">
      {post?.map((post) => {
        return (
          <div className="w-80 bg-slate-50">
            <img src={post.post_img[0].img} className="mb-5" />
            <p>
              {`${post.post_text[0].text} `}
              {post.post_text[0].hBlockId.content}
            </p>
          </div>
        );
      })}
    </section>
  );
}
