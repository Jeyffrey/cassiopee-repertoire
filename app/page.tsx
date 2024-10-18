import { supabase } from '@/utils/database';

export default async function Home() {
  const { data: songs } = await supabase.from('Songs').select();

  return (
    <main className="max-w-screen-xl mx-auto">
      <ul className="p-6 grid gap-6">
        {songs?.map((song) => (
          <li
            key={song.id}
          >
            <a
              href={`/song/${song.id}`}
              className="
              block
              p-4 transition-colors duration-500
              bg-slate-50/10 border border-slate-50/20 rounded-xl
              hover:bg-slate-50/20
           ">
              <article>
                <h2 className="font-black text-body-lg leading-none">{song.title}</h2>
                <div className="opacity-80 font-light text-body leading-none mt-2">{song.artist}</div>
              </article>
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
