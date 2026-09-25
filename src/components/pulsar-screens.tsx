import { useState } from "react";
import { ChevronDown, Heart, ImageIcon, ListMusic, Pause, Play, Repeat2, Search, Shuffle, SkipBack, SkipForward, UserPlus, Users, Video, Volume2, X } from "lucide-react";
import { Button } from "./ui/button";
import cover from "../assets/cover-radar.jpg";

export function NowPlayingScreen({ playing, onPlay, close, onQueue }: { playing: boolean; onPlay: () => void; close: () => void; onQueue: () => void }) {
  const [video, setVideo] = useState(false);
  const [liked, setLiked] = useState(true);
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-background animate-fade-in">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,color-mix(in_oklab,var(--coral)_28%,transparent),transparent_55%),radial-gradient(ellipse_at_50%_100%,color-mix(in_oklab,var(--cyan)_22%,transparent),transparent_55%)]" />
      <div className="relative mx-auto flex min-h-full max-w-5xl flex-col px-5 py-6 sm:px-8">
        <div className="flex items-center justify-between">
          <Button onClick={close} className="rounded-full"><ChevronDown size={16}/> Minimizar</Button>
          <p className="hidden text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground sm:block">Reproduzindo agora</p>
          <div className="flex gap-2">
            <Button onClick={() => setVideo(!video)} className={`rounded-full ${video ? "text-coral" : ""}`}><Video size={16}/> {video ? "Modo Vídeo Ativo" : "Ver Vídeo"}</Button>
            <Button variant="icon" onClick={onQueue} aria-label="Fila"><ListMusic size={17}/></Button>
          </div>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center gap-7 py-8">
          {video ? (
            <div className="glass-panel relative aspect-video w-full max-w-2xl overflow-hidden rounded-3xl shadow-2xl">
              <img src={cover} alt="" className="absolute inset-0 h-full w-full scale-110 object-cover blur-[2px]"/>
              <div className="absolute inset-0 bg-background/30"/>
              <span className="glass-control absolute left-4 top-4 rounded-full px-3 py-1 text-[10px] font-bold text-cyan">Vídeo Oficial Sincronizado</span>
              <div className="absolute inset-0 grid place-items-center"><Button variant="primary" className="size-16 rounded-full p-0" onClick={onPlay}>{playing ? <Pause fill="currentColor"/> : <Play fill="currentColor"/>}</Button></div>
              <Button onClick={() => setVideo(false)} className="absolute bottom-4 right-4 rounded-full text-xs"><ImageIcon size={14}/> Voltar para Capa</Button>
            </div>
          ) : (
            <img src={cover} alt="Capa" className="aspect-square w-[min(72vw,340px)] rounded-3xl object-cover shadow-2xl ring-1 ring-border"/>
          )}
          <div className="w-full max-w-xl">
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0"><h2 className="truncate font-display text-2xl font-semibold sm:text-3xl">Luz do Amanhã</h2><p className="text-sm font-semibold uppercase text-muted-foreground">Banda Aurora</p></div>
              <Button variant="icon" onClick={() => setLiked(!liked)} className={liked ? "text-coral" : ""} aria-label="Favoritar"><Heart size={18} fill={liked ? "currentColor" : "none"}/></Button>
            </div>
            <div className="mt-6 h-1.5 rounded-full bg-muted"><div className="relative h-full w-[64%] rounded-full bg-cyan"><span className="absolute -right-2 -top-[5px] size-4 rounded-full bg-cyan shadow-[0_0_12px_var(--cyan)]"/></div></div>
            <div className="mt-2 flex justify-between font-mono text-[11px] text-muted-foreground"><span>2:34</span><span>4:02</span></div>
            <div className="mt-6 flex items-center justify-center gap-6 text-cyan">
              <Shuffle size={18}/><SkipBack size={26} className="text-foreground" fill="currentColor"/>
              <Button variant="primary" className="size-16 rounded-full p-0" onClick={onPlay} aria-label={playing ? "Pausar" : "Reproduzir"}>{playing ? <Pause fill="currentColor"/> : <Play fill="currentColor"/>}</Button>
              <SkipForward size={26} className="text-foreground" fill="currentColor"/><Repeat2 size={18}/>
            </div>
            <div className="mx-auto mt-8 flex max-w-md items-center gap-3"><Volume2 size={16} className="text-muted-foreground"/><div className="h-1 flex-1 rounded-full bg-muted"><div className="h-full w-1/5 rounded-full bg-foreground/70"/></div></div>
          </div>
        </div>
      </div>
    </div>
  );
}

type Tab = "amigos" | "pendentes" | "adicionar";
export function FriendsPanel({ close }: { close: () => void }) {
  const [tab, setTab] = useState<Tab>("amigos");
  const [tag, setTag] = useState("");
  const tabs: Array<[Tab, string, string]> = [["amigos", "Amigos (0)", "bg-cyan/20 text-cyan"], ["pendentes", "Pendentes", "bg-accent text-foreground"], ["adicionar", "Adicionar", "bg-coral/20 text-coral"]];
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-background/40 backdrop-blur-sm" onMouseDown={e => { if (e.target === e.currentTarget) close(); }}>
      <aside className="glass-panel animate-fade-in flex h-full w-full max-w-sm flex-col rounded-none border-l border-border">
        <div className="flex items-center justify-between p-5"><h2 className="flex items-center gap-2 font-display text-lg font-semibold"><Users size={18} className="text-cyan"/> Amigos & Comunidade</h2><Button variant="ghost" className="size-8 p-0" onClick={close} aria-label="Fechar"><X size={18}/></Button></div>
        <div className="px-5">
          <div className="glass-control flex items-center gap-3 rounded-2xl p-3">
            <span className="relative grid size-10 place-items-center rounded-full bg-cyan/20 text-xs font-bold text-cyan">PV<i className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 border-background bg-positive"/></span>
            <span className="min-w-0"><b className="text-sm">Paulo</b> <small className="text-[10px] font-bold text-cyan">#PS7D</small><small className="block truncate text-xs text-muted-foreground">Ouvindo: Luz do Amanhã</small></span>
          </div>
          <div className="glass-control mt-4 grid grid-cols-3 gap-1 rounded-full p-1">
            {tabs.map(([k, l, c]) => <button key={k} onClick={() => setTab(k)} className={`rounded-full py-2 text-xs font-bold transition-colors ${tab === k ? c : "text-muted-foreground hover:text-foreground"}`}>{l}</button>)}
          </div>
        </div>
        <div className="mt-5 flex-1 border-t border-border p-5">
          {tab === "amigos" && <><label className="glass-control flex h-10 items-center gap-2 rounded-xl px-3"><Search size={15} className="text-muted-foreground"/><input placeholder="Filtrar por nome ou tag..." className="flex-1 bg-transparent text-sm outline-none"/></label><div className="mt-16 text-center"><Users className="mx-auto text-muted-foreground" size={28}/><p className="mt-3 text-sm text-muted-foreground">Nenhum amigo online ou adicionado ainda.</p><button onClick={() => setTab("adicionar")} className="mt-3 text-sm font-bold text-cyan hover:underline">Adicione alguém pelo nome de usuário!</button></div></>}
          {tab === "pendentes" && <><p className="text-[11px] font-bold uppercase text-coral">Recebidos (0)</p><p className="mt-3 text-sm text-muted-foreground">Nenhuma solicitação de amizade pendente.</p></>}
          {tab === "adicionar" && <><h3 className="font-display font-semibold">Adicionar por Nome e Tag</h3><p className="mt-1 text-xs text-muted-foreground">Use o nome de usuário seguido da tag de 4 dígitos (ex: <code className="text-cyan">Pulsar#7X9A</code>).</p><input value={tag} onChange={e => setTag(e.target.value.toUpperCase())} placeholder="EX: KAUE#4F82" className="glass-control mt-4 h-11 w-full rounded-xl px-4 font-mono text-sm outline-none focus:ring-2 focus:ring-ring"/><Button variant="primary" className="mt-3 w-full" disabled={!/^.+#\w{4}$/.test(tag)}><UserPlus size={15}/> Enviar Pedido de Amizade</Button></>}
        </div>
      </aside>
    </div>
  );
}
