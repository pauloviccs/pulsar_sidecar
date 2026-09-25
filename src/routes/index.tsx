import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Bell, ChevronLeft, ChevronRight, Clock3, Disc3, Heart, History, Home, Library,
  ListMusic, Maximize2, MessageCircle, Mic2, Moon, MoreHorizontal, Music2, Pause,
  Play, Plus, Radio, Repeat2, Search, Settings, Shuffle, SkipBack, SkipForward,
  SlidersHorizontal, Sun, UserRound, Users, Volume2, X, Zap,
} from "lucide-react";
import { Button } from "../components/ui/button";
import heroImage from "../assets/pulsar-hero.jpg";
import radarCover from "../assets/cover-radar.jpg";
import synthCover from "../assets/cover-synth.jpg";
import focusCover from "../assets/cover-focus.jpg";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Início — Pulsar" },
    { name: "description", content: "Descubra os sons que estão movimentando a comunidade Pulsar." },
    { property: "og:title", content: "Início — Pulsar" },
    { property: "og:description", content: "Descubra os sons que estão movimentando a comunidade Pulsar." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: PulsarApp,
});

type View = "Início" | "Buscar" | "Biblioteca" | "Favoritas" | "Histórico" | "Perfil" | "Ajustes";
type Overlay = "queue" | "chat" | "connect" | "playlist" | "now" | null;

const playlists = [
  { title: "Radar de Novidades", meta: "Atualizado hoje · 50 músicas", image: radarCover, tint: "cyan" },
  { title: "Sintetizadores & Neon", meta: "Por Pulsar Curadoria", image: synthCover, tint: "coral" },
  { title: "Foco Profundo", meta: "Lo-fi para trabalhar", image: focusCover, tint: "cyan" },
  { title: "Clássicos Modernos", meta: "O melhor da última década", image: radarCover, tint: "coral" },
];

const tracks = [
  ["Horizonte Distante", "Banda Aurora", "3:42", "+12%"],
  ["Echoes of São Paulo", "Luma & os Satélites", "4:08", "+8%"],
  ["Tropicália 2.0", "Mar Aberto", "3:16", "+5%"],
  ["Deixa Fluir", "Marina Silva", "2:58", "+3%"],
];

function PulsarApp() {
  const [view, setView] = useState<View>("Início");
  const [overlay, setOverlay] = useState<Overlay>(null);
  const [dark, setDark] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [liked, setLiked] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => { document.documentElement.classList.toggle("dark", dark); }, [dark]);

  const nav: Array<[View, typeof Home]> = [
    ["Início", Home], ["Buscar", Search], ["Biblioteca", Library], ["Favoritas", Heart],
    ["Histórico", History], ["Perfil", UserRound], ["Ajustes", Settings],
  ];

  return (
    <div className="relative flex h-dvh min-h-[680px] w-full overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,color-mix(in_oklab,var(--cyan)_12%,transparent),transparent_32%),radial-gradient(circle_at_88%_72%,color-mix(in_oklab,var(--coral)_9%,transparent),transparent_30%)]" />
      <aside className="relative z-30 hidden w-[76px] shrink-0 flex-col items-center border-r border-border bg-background/75 py-5 backdrop-blur-xl md:flex">
        <img src="/favicon.svg" alt="Pulsar" className="mb-8 size-11 drop-shadow-[0_0_12px_color-mix(in_oklab,var(--cyan)_35%,transparent)]" />
        <nav className="flex flex-1 flex-col items-center gap-2" aria-label="Navegação principal">
          {nav.map(([label, Icon]) => <button key={label} onClick={() => setView(label)} aria-label={label} title={label} className={`relative grid size-11 place-items-center rounded-xl transition-colors ${view === label ? "bg-accent text-cyan" : "text-muted-foreground hover:bg-accent hover:text-foreground"}`}><Icon size={19}/>{view === label && <span className="absolute -left-[17px] h-5 w-0.5 rounded-r bg-cyan"/>}</button>)}
        </nav>
        <Button variant="icon" onClick={() => setDark(!dark)} aria-label={dark ? "Ativar tema claro" : "Ativar tema escuro"}>{dark ? <Sun size={18}/> : <Moon size={18}/>}</Button>
      </aside>

      <main className="relative z-10 flex min-w-0 flex-1 flex-col overflow-hidden">
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-border bg-background/62 px-4 backdrop-blur-xl sm:px-7">
          <div className="flex items-center gap-2">
            <Button variant="ghost" className="hidden size-9 p-0 sm:inline-flex" aria-label="Voltar"><ChevronLeft size={18}/></Button>
            <Button variant="ghost" className="hidden size-9 p-0 sm:inline-flex" aria-label="Avançar"><ChevronRight size={18}/></Button>
            <label className="glass-control flex h-10 w-[min(42vw,390px)] items-center gap-3 rounded-full px-4">
              <Search size={16} className="shrink-0 text-muted-foreground"/>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Artistas, músicas ou podcasts..." className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"/>
            </label>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden items-center gap-2 text-[10px] font-bold uppercase text-muted-foreground sm:flex"><span className="size-1.5 animate-pulse rounded-full bg-cyan"/> Sincronizado</div>
            <Button variant="icon" aria-label="Notificações"><Bell size={17}/></Button>
            <button onClick={() => setView("Perfil")} className="grid size-9 place-items-center rounded-full bg-cyan/20 text-xs font-bold text-cyan ring-1 ring-cyan/40">PV</button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-4 pb-36 pt-6 sm:px-7 lg:px-10">
          {view === "Início" ? <HomeView search={search} onPlay={() => setPlaying(true)} onOpenPlaylist={() => setView("Biblioteca")}/> : <SecondaryView view={view} onPlay={() => setPlaying(true)} onNewPlaylist={() => setOverlay("playlist")}/>} 
        </div>
      </main>

      <CommunityPanel onChat={() => setOverlay("chat")}/>
      <Player playing={playing} liked={liked} onPlay={() => setPlaying(!playing)} onLike={() => setLiked(!liked)} onQueue={() => setOverlay("queue")} onConnect={() => setOverlay("connect")} onNow={() => setOverlay("now")}/>
      {overlay && <OverlayView type={overlay} close={() => setOverlay(null)} playing={playing} onPlay={() => setPlaying(!playing)}/>} 
    </div>
  );
}

function HomeView({ search, onPlay, onOpenPlaylist }: { search: string; onPlay: () => void; onOpenPlaylist: () => void }) {
  const visible = playlists.filter(p => `${p.title} ${p.meta}`.toLowerCase().includes(search.toLowerCase()));
  return <div className="mx-auto max-w-[1120px] animate-fade-in">
    <section className="relative mb-10 aspect-[21/9] min-h-[310px] overflow-hidden rounded-2xl shadow-2xl">
      <img src={heroImage} alt="Banda brasileira em apresentação ao vivo" width={1536} height={768} className="absolute inset-0 h-full w-full object-cover"/>
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent"/>
      <div className="absolute inset-x-0 bottom-0 max-w-2xl p-6 sm:p-9">
        <span className="mb-3 inline-flex rounded bg-primary/20 px-2 py-1 text-[10px] font-bold uppercase text-coral ring-1 ring-primary/35">Destaque da semana</span>
        <h1 className="font-display text-3xl font-semibold leading-tight sm:text-5xl">Vibrações urbanas:<br/>o novo indie nacional</h1>
        <p className="mt-3 hidden text-sm text-foreground/70 sm:block">Uma seleção de vozes que estão redesenhando a cena independente brasileira.</p>
        <div className="mt-5 flex gap-3"><Button variant="primary" onClick={onPlay}><Play size={16} fill="currentColor"/> Ouvir agora</Button><Button onClick={onOpenPlaylist}><Plus size={16}/> Salvar</Button></div>
      </div>
    </section>
    <section>
      <div className="mb-5 flex items-end justify-between"><div><p className="mb-1 text-[10px] font-bold uppercase text-cyan">Descoberta comunitária</p><h2 className="font-display text-2xl font-semibold">Playlists em ascensão</h2></div><button onClick={onOpenPlaylist} className="text-sm font-semibold text-cyan hover:underline">Ver todas</button></div>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {visible.map((p, i) => <article key={p.title} className="group min-w-0"><button onClick={onPlay} className="relative mb-3 block aspect-square w-full overflow-hidden rounded-xl text-left shadow-lg"><img src={p.image} alt={`Capa de ${p.title}`} width={816} height={816} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"/><span className="absolute inset-0 grid place-items-center bg-background/20 opacity-0 transition-opacity group-hover:opacity-100"><span className="grid size-12 place-items-center rounded-full bg-foreground text-background shadow-xl"><Play size={20} fill="currentColor"/></span></span>{i < 2 && <span className="absolute right-2 top-2 rounded-full bg-popover/80 px-2 py-1 text-[9px] font-bold backdrop-blur-md">+{18-i*6}% hoje</span>}</button><h3 className="truncate text-sm font-bold">{p.title}</h3><p className="truncate text-xs text-muted-foreground">{p.meta}</p></article>)}
      </div>
    </section>
    <section className="mt-10"><div className="mb-4 flex items-center justify-between"><h2 className="font-display text-xl font-semibold">Mais ouvidas no Pulsar</h2><span className="text-xs text-muted-foreground">Atualizado agora</span></div><div className="glass-panel overflow-hidden rounded-xl">{tracks.map((t,i)=><button key={t[0]} onClick={onPlay} className="grid w-full grid-cols-[28px_1fr_auto_auto] items-center gap-4 border-b border-border px-4 py-3 text-left last:border-0 hover:bg-accent"><span className="font-display text-xs text-muted-foreground">0{i+1}</span><span><b className="block text-sm">{t[0]}</b><small className="text-muted-foreground">{t[1]}</small></span><span className="text-xs font-bold text-cyan">{t[3]}</span><span className="hidden text-xs text-muted-foreground sm:block">{t[2]}</span></button>)}</div></section>
  </div>;
}

function SecondaryView({ view, onPlay, onNewPlaylist }: { view: View; onPlay: () => void; onNewPlaylist: () => void }) {
  if (view === "Ajustes") return <div className="mx-auto max-w-4xl animate-fade-in"><PageTitle title="Ajustes" subtitle="Personalize sua experiência Pulsar."/><div className="grid gap-4 sm:grid-cols-2">{[["Reprodução","Crossfade, normalização e qualidade"],["Aparência","Tema e intensidade do vidro"],["Pulsar Connect","Dispositivos e saídas de áudio"],["Conta e privacidade","Perfil, presença e sincronização"]].map(([a,b],i)=><button key={a} className="glass-panel flex items-center gap-4 rounded-xl p-5 text-left hover:bg-accent"><span className="grid size-10 place-items-center rounded-lg bg-accent text-cyan">{i===0?<SlidersHorizontal size={19}/>:i===1?<Sun size={19}/>:i===2?<Radio size={19}/>:<UserRound size={19}/>}</span><span><b className="font-display">{a}</b><small className="mt-1 block text-muted-foreground">{b}</small></span></button>)}</div></div>;
  if (view === "Perfil") return <div className="mx-auto max-w-4xl animate-fade-in"><div className="glass-panel overflow-hidden rounded-2xl"><div className="h-40 bg-[linear-gradient(120deg,var(--cyan),var(--coral))] opacity-80"/><div className="p-6"><div className="-mt-16 mb-4 grid size-20 place-items-center rounded-full bg-popover text-xl font-bold ring-4 ring-background">PV</div><h1 className="font-display text-3xl font-semibold">Paulo Vinicios</h1><p className="mt-1 text-sm text-muted-foreground">@pauloviccs · Salvador, BA</p><div className="mt-5 flex gap-6 text-sm"><span><b>24</b> playlists</span><span><b>386</b> seguidores</span><span><b>128</b> seguindo</span></div></div></div><h2 className="mb-4 mt-8 font-display text-xl font-semibold">Seu pulso musical</h2><TrackRows onPlay={onPlay}/></div>;
  const descriptions: Record<View,string> = {"Início":"","Buscar":"Encontre músicas, artistas, podcasts e pessoas.","Biblioteca":"Tudo o que você salvou, organizado do seu jeito.","Favoritas":"As faixas que você não cansa de ouvir.","Histórico":"Relembre o que passou pelos seus fones.","Perfil":"","Ajustes":""};
  return <div className="mx-auto max-w-[1120px] animate-fade-in"><div className="flex items-end justify-between"><PageTitle title={view} subtitle={descriptions[view]}/>{view === "Biblioteca" && <Button variant="primary" onClick={onNewPlaylist}><Plus size={16}/> Nova playlist</Button>}</div>{view === "Biblioteca" ? <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">{playlists.map(p=><button key={p.title} onClick={onPlay} className="group text-left"><img src={p.image} alt="" className="aspect-square w-full rounded-xl object-cover shadow-xl transition-transform group-hover:-translate-y-1"/><b className="mt-3 block">{p.title}</b><small className="text-muted-foreground">{p.meta}</small></button>)}</div> : <TrackRows onPlay={onPlay}/>}</div>;
}

function PageTitle({title,subtitle}:{title:string;subtitle:string}) { return <div className="mb-8"><h1 className="font-display text-4xl font-semibold">{title}</h1><p className="mt-2 text-sm text-muted-foreground">{subtitle}</p></div> }
function TrackRows({onPlay}:{onPlay:()=>void}) { return <div className="glass-panel overflow-hidden rounded-xl">{tracks.concat(tracks.slice(0,2)).map((t,i)=>{const playlist=playlists[i%playlists.length]; return <button key={`${t[0]}${i}`} onClick={onPlay} className="grid w-full grid-cols-[42px_1fr_auto] items-center gap-4 border-b border-border p-3 text-left last:border-0 hover:bg-accent"><img src={playlist?.image ?? radarCover} alt="" className="size-10 rounded-md object-cover"/><span><b className="block text-sm">{t[0]}</b><small className="text-muted-foreground">{t[1]}</small></span><MoreHorizontal size={17} className="text-muted-foreground"/></button>})}</div> }

function CommunityPanel({onChat}:{onChat:()=>void}) { const friends=[["Mariana Silva","Ouvindo Deixa Fluir","MS"],["Lucas Rocha","Criou Techno Sessions","LR"],["Ana Clara","Ouvindo Podcast Pulsar","AC"]]; return <aside className="relative z-20 hidden w-72 shrink-0 flex-col border-l border-border bg-background/70 px-5 pb-32 pt-6 backdrop-blur-xl xl:flex"><div className="mb-6 flex items-center justify-between"><h2 className="font-display text-base font-semibold">Amigos ouvindo</h2><Button variant="ghost" className="size-8 p-0" onClick={onChat} aria-label="Abrir mensagens"><MessageCircle size={16}/></Button></div><div className="space-y-5">{friends.map((f,i)=><button onClick={onChat} key={f[0]} className="flex w-full gap-3 text-left"><span className={`relative grid size-10 shrink-0 place-items-center rounded-full text-xs font-bold ${i===0?"bg-cyan/20 text-cyan":"bg-accent text-muted-foreground"}`}>{f[2]}{i!==1&&<i className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 border-background bg-positive"/>}</span><span className="min-w-0"><b className="block truncate text-sm">{f[0]}</b><small className="block truncate text-xs text-muted-foreground">{f[1]}</small>{i===0&&<em className="mt-1 block text-[10px] font-semibold not-italic text-coral">♥ Amando essa faixa</em>}</span></button>)}</div><div className="mt-auto"><p className="mb-4 text-[10px] font-bold uppercase text-muted-foreground">Ranking comunidade</p><div className="space-y-3">{tracks.slice(0,3).map((t,i)=><div key={t[0]} className="flex items-center justify-between text-xs"><span className="truncate">{i+1}. {t[0]}</span><b className="text-cyan">{t[3]}</b></div>)}</div><Button className="mt-6 w-full text-xs" onClick={onChat}><Users size={15}/> Ver comunidade</Button></div></aside> }

function Player({playing,liked,onPlay,onLike,onQueue,onConnect,onNow}:{playing:boolean;liked:boolean;onPlay:()=>void;onLike:()=>void;onQueue:()=>void;onConnect:()=>void;onNow:()=>void}) { return <footer className="glass-panel fixed bottom-3 left-3 right-3 z-40 flex h-[88px] items-center gap-5 rounded-2xl px-4 md:left-[88px] md:px-6"><button onClick={onNow} className="flex min-w-0 items-center gap-3 md:w-64"><img src={radarCover} alt="Capa de Luz do Amanhã" className="size-12 shrink-0 rounded-lg object-cover"/><span className="hidden min-w-0 text-left sm:block"><b className="block truncate text-sm">Luz do Amanhã</b><small className="block truncate text-muted-foreground">Banda Aurora</small></span></button><Button variant="ghost" onClick={onLike} className={`hidden size-8 p-0 sm:inline-flex ${liked?"text-coral":""}`} aria-label="Favoritar"><Heart size={16} fill={liked?"currentColor":"none"}/></Button><div className="flex flex-1 flex-col items-center gap-2"><div className="flex items-center gap-3 sm:gap-5"><Button variant="ghost" className="hidden size-8 p-0 sm:inline-flex" aria-label="Aleatório"><Shuffle size={15}/></Button><Button variant="ghost" className="size-8 p-0" aria-label="Anterior"><SkipBack size={18} fill="currentColor"/></Button><Button variant="primary" className="size-10 p-0" onClick={onPlay} aria-label={playing?"Pausar":"Reproduzir"}>{playing?<Pause size={18} fill="currentColor"/>:<Play size={18} fill="currentColor"/>}</Button><Button variant="ghost" className="size-8 p-0" aria-label="Próxima"><SkipForward size={18} fill="currentColor"/></Button><Button variant="ghost" className="hidden size-8 p-0 sm:inline-flex" aria-label="Repetir"><Repeat2 size={15}/></Button></div><div className="hidden w-full max-w-lg items-center gap-3 sm:flex"><span className="text-[9px] text-muted-foreground">1:24</span><div className="h-1 flex-1 overflow-hidden rounded-full bg-muted"><div className="h-full w-1/3 bg-cyan"/></div><span className="text-[9px] text-muted-foreground">4:02</span></div></div><div className="hidden items-center gap-2 lg:flex"><Volume2 size={16} className="text-muted-foreground"/><div className="h-1 w-16 rounded-full bg-muted"><div className="h-full w-2/3 rounded-full bg-foreground/50"/></div><Button variant="icon" onClick={onQueue} aria-label="Fila"><ListMusic size={17}/></Button><Button onClick={onConnect} className="text-xs"><Radio size={15}/> Connect</Button></div></footer> }

function OverlayView({type,close,playing,onPlay}:{type:Exclude<Overlay,null>;close:()=>void;playing:boolean;onPlay:()=>void}) { const title={queue:"Fila de reprodução",chat:"Comunidade Pulsar",connect:"Pulsar Connect",playlist:"Nova playlist",now:"Tocando agora"}[type]; return <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/55 p-4 backdrop-blur-md" onMouseDown={e=>{if(e.target===e.currentTarget)close()}}><section className={`glass-panel animate-scale-in relative w-full overflow-hidden rounded-2xl ${type==="now"?"max-w-3xl":"max-w-md"}`}><div className="flex items-center justify-between border-b border-border p-5"><h2 className="font-display text-lg font-semibold">{title}</h2><Button variant="ghost" className="size-8 p-0" onClick={close} aria-label="Fechar"><X size={18}/></Button></div>{type==="now"?<div className="grid gap-6 p-6 sm:grid-cols-2"><img src={radarCover} alt="" className="aspect-square w-full rounded-xl object-cover shadow-2xl"/><div className="flex flex-col justify-center"><p className="text-xs font-bold uppercase text-cyan">Tocando do ranking Pulsar</p><h3 className="mt-3 font-display text-3xl font-semibold">Luz do Amanhã</h3><p className="mt-1 text-muted-foreground">Banda Aurora</p><div className="my-7 h-1 rounded-full bg-muted"><div className="h-full w-1/3 bg-cyan"/></div><div className="flex items-center justify-center gap-5"><SkipBack/><Button variant="primary" className="size-14 p-0" onClick={onPlay}>{playing?<Pause fill="currentColor"/>:<Play fill="currentColor"/>}</Button><SkipForward/></div></div></div>:<div className="p-5">{type==="playlist"?<><label className="mb-2 block text-xs font-bold text-muted-foreground">NOME DA PLAYLIST</label><input autoFocus placeholder="Minha nova playlist" className="glass-control h-11 w-full rounded-lg px-3 outline-none focus:ring-2 focus:ring-ring"/><Button variant="primary" className="mt-5 w-full" onClick={close}><Plus size={16}/> Criar playlist</Button></>:type==="connect"?<div className="space-y-3">{[["Este computador","Áudio local · Ativo"],["Sala de estar","Chromecast disponível"],["Pulsar Mini","Bluetooth"]].map((d,i)=><button key={d[0]} className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left ${i===0?"border-cyan bg-accent":"border-border hover:bg-accent"}`}><span className="grid size-10 place-items-center rounded-lg bg-muted"><Radio size={18}/></span><span><b className="block text-sm">{d[0]}</b><small className="text-muted-foreground">{d[1]}</small></span></button>)}</div>:type==="chat"?<><div className="mb-4 flex gap-3"><span className="grid size-10 place-items-center rounded-full bg-cyan/20 text-xs font-bold text-cyan">MS</span><span><b className="block text-sm">Mariana Silva</b><small className="text-cyan">online agora</small></span></div><div className="space-y-3"><p className="ml-auto max-w-[80%] rounded-xl rounded-br-sm bg-primary p-3 text-sm text-primary-foreground">Essa faixa nova está absurda.</p><p className="max-w-[80%] rounded-xl rounded-bl-sm bg-accent p-3 text-sm">Já salvei na nossa playlist ✦</p></div><div className="mt-5 flex gap-2"><input placeholder="Enviar mensagem..." className="glass-control h-10 min-w-0 flex-1 rounded-full px-4 text-sm outline-none"/><Button variant="primary" className="size-10 p-0"><ChevronRight size={17}/></Button></div></>:<TrackRows onPlay={onPlay}/>}</div>}</section></div> }