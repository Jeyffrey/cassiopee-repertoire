import { supabase } from '@/utils/database';

export async function generateStaticParams() {
  const { data: songs } = await supabase.from('Songs').select();

  return songs?.map(({ id }) => ({
    id: id.toString(),
  })) || [];
}

export default async function Song({ params }: { params: { id: string } }) {
  const { data: songs } = await supabase.from('Songs').select().eq('id', params.id);
  const currentSong = songs?.[0];

  const { data: recordings } = await supabase.from('Recordings').select().eq('song_id', params.id).order('id', { ascending: true });

  const { data: scores } = await supabase.from('Scores').select().eq('song_id', params.id);
  const score = scores?.[0];

  const { data: videos } = await supabase.from('Videos').select().eq('song_id', params.id).order('id', { ascending: true });

  return (
    <main className="h-screen flex flex-wrap gap-6 p-4">
      <section className="max-h-full overflow-auto basis-0 grow min-w-[min(400px,100%)]">
        <div className="sticky top-0 z-10 bg-dark">
          <a href="/" className="inline-block w-6 h-6 mb-2 rounded-full border text-center leading-tight">⬅︎</a>
          <h1 className="pb-6 text-body">
            <strong className="font-black">{currentSong.title}</strong>
            <small className="block font-light">{currentSong.artist}</small>
          </h1>
        </div>
        {!!recordings?.length && (
          <article className="p-6 transition-colors duration-500 bg-slate-50/10 border border-slate-50/20 rounded-xl">
            {recordings.map((recording) => (
              <div key={recording.title} className="[&:not(:first-child)]:mt-6">
                {recording.title && (
                <h2 className="mb-4 text-body-sm">
                  🎙️&nbsp;
                  {recording.title}
                </h2>
                )}
                <audio controls src={recording.url} className="w-full">
                  <track kind="captions" />
                </audio>
              </div>
            ))}
          </article>
        )}
        {!!videos?.length && videos.map((video) => (
          <article key={video.youtube_id} className="mt-6 p-6 transition-colors duration-500 bg-slate-50/10 border border-slate-50/20 rounded-xl">
            {video.title && (
            <h2 className="mb-4 text-body-sm">
              📀&nbsp;
              {video.title}
            </h2>
            )}
            <iframe
              key={video.youtube_id}
              src={`https://www.youtube.com/embed/${video.youtube_id}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={`Embedded youtube for ${currentSong?.title} by ${currentSong?.artist}`}
              className="w-full aspect-video"
            />
          </article>
        ))}
      </section>
      <section className="h-full basis-0 [flex-grow:2] min-w-[min(800px,100%)] p-6 transition-colors duration-500 bg-slate-50/10 border border-slate-50/20 rounded-xl">
        {score?.url && (
          <iframe
            src={score.url}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Partition"
            className="w-full h-full min-h-[min(160vmin,90dvh)]"
          />
        )}
      </section>
    </main>
  );
}
