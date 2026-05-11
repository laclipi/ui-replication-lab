import { cn } from "@/lib/utils";

// HeroCodePreview
// ===============
// El panel decorativo a la derecha del hero. Imita el "live code preview" que
// stripe.com usa para señalar al developer "esto se integra en 5 líneas".
//
// Cómo lo construyo (sin syntax highlighter real para no inflar el bundle):
//
//   1. Ventana principal con chrome estilo macOS (3 dots + filename mono).
//   2. Contenido: cada token coloreado con un <Token color="...">  → spans
//      con clases Tailwind. Es "fake syntax highlighting" pero perfectamente
//      convincente porque el ojo busca PATRÓN, no validez sintáctica.
//   3. Response card stackeada debajo con offset → look de "flow" de cards
//      relacionadas (clásico Stripe).
//
// Componente puramente visual / decorativo. Server component (sin "use client")
// — no necesita estado ni interactividad.

// Token helper
// ------------
// Toda la "syntax highlighting" pasa por este wrapper. Si mañana queremos
// cambiar la paleta (p.ej. acercarnos a un tema concreto) tocamos UN sitio.
type TokenColor =
  | "keyword" // import / const / await — violeta
  | "string" // "literales" — verde
  | "fn" // nombres de función — ámbar
  | "prop" // claves de objeto — cian
  | "number" // números — naranja
  | "comment" // // comentarios — gris
  | "punct"; // signos sueltos cuando queremos enfatizar — foreground/70

const TOKEN_COLOR_CLASSES: Record<TokenColor, string> = {
  keyword: "text-violet-300",
  string: "text-emerald-300",
  fn: "text-amber-300",
  prop: "text-sky-300",
  number: "text-orange-300",
  comment: "text-muted-foreground",
  punct: "text-foreground/70",
};

function Token({
  color,
  children,
}: {
  color: TokenColor;
  children: React.ReactNode;
}) {
  return <span className={TOKEN_COLOR_CLASSES[color]}>{children}</span>;
}

// WindowChrome
// ------------
// Cabecera de la ventana: 3 dots + título. Se reutiliza en ambos cards
// (petición + respuesta).
function WindowChrome({ title }: { title: string }) {
  return (
    <div className="border-foreground/10 flex items-center gap-1.5 border-b px-4 py-3">
      {/* Los 3 dots clásicos. Opacidad baja para que no compitan con el código. */}
      <span className="size-2.5 rounded-full bg-red-400/70" />
      <span className="size-2.5 rounded-full bg-amber-400/70" />
      <span className="size-2.5 rounded-full bg-emerald-400/70" />
      {/* Título centrado-ish en mono → look terminal/editor */}
      <span className="text-muted-foreground ml-3 font-mono text-xs">
        {title}
      </span>
    </div>
  );
}

export function HeroCodePreview({ className }: { className?: string }) {
  return (
    // relative + isolation para que las sombras de los dos cards no se solapen feas.
    <div className={cn("relative isolate", className)}>
      {/* CARD 1 — Request
          ---------------
          rotate-1 + perspective sutil = look "presentación de producto"
          (Apple keynote style). Nos da volumen sin recurrir a 3D real. */}
      <div className="code-window relative z-10 rounded-2xl border border-white/10 ring-1 ring-black/5">
        <WindowChrome title="checkout.ts" />

        {/* font-mono explícito + text-[13px] (no es múltiplo de 4 a propósito —
            13px es el sweet spot de legibilidad de monospace en pantalla). */}
        <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-6">
          <code className="text-foreground/90">
            <Token color="keyword">import</Token>{" "}
            <Token color="punct">{"{"}</Token> client{" "}
            <Token color="punct">{"}"}</Token>{" "}
            <Token color="keyword">from</Token>{" "}
            <Token color="string">{`"@ui-lab/sdk"`}</Token>
            <Token color="punct">;</Token>
            {"\n\n"}
            <Token color="comment">{`// Create a checkout in 4 lines.`}</Token>
            {"\n"}
            <Token color="keyword">const</Token> order{" "}
            <Token color="punct">=</Token> <Token color="keyword">await</Token>{" "}
            client.checkout.
            <Token color="fn">create</Token>
            <Token color="punct">{"({"}</Token>
            {"\n  "}
            <Token color="prop">amount</Token>
            <Token color="punct">:</Token> <Token color="number">4_900</Token>
            <Token color="punct">,</Token>{" "}
            <Token color="comment">{`// $49.00`}</Token>
            {"\n  "}
            <Token color="prop">currency</Token>
            <Token color="punct">:</Token>{" "}
            <Token color="string">{`"usd"`}</Token>
            <Token color="punct">,</Token>
            {"\n  "}
            <Token color="prop">customer</Token>
            <Token color="punct">:</Token>{" "}
            <Token color="string">{`"cus_8nQ2Lp"`}</Token>
            <Token color="punct">,</Token>
            {"\n"}
            <Token color="punct">{"});"}</Token>
          </code>
        </pre>
      </div>

      {/* CARD 2 — Response
          ----------------
          ml-12 + -mt-2 → indenta y se mete LIGERAMENTE debajo del card 1.
          z-0 (vs z-10 del card 1) → el primero pisa al segundo en la zona de
          overlap. Crea jerarquía visual: "esta es la respuesta de aquella
          llamada", no dos cards iguales sueltas. */}
      <div className="code-window relative z-0 -mt-2 ml-12 rounded-2xl border border-white/10 ring-1 ring-black/5">
        <WindowChrome title="response.json" />

        <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-6">
          <code className="text-foreground/90">
            <Token color="punct">{"{"}</Token>
            {"\n  "}
            <Token color="prop">{`"id"`}</Token>
            <Token color="punct">:</Token>{" "}
            <Token color="string">{`"ord_1A8sBn"`}</Token>
            <Token color="punct">,</Token>
            {"\n  "}
            <Token color="prop">{`"status"`}</Token>
            <Token color="punct">:</Token>{" "}
            <Token color="string">{`"succeeded"`}</Token>
            <Token color="punct">,</Token>
            {"\n  "}
            <Token color="prop">{`"amount"`}</Token>
            <Token color="punct">:</Token> <Token color="number">4900</Token>
            <Token color="punct">,</Token>
            {"\n  "}
            <Token color="prop">{`"livemode"`}</Token>
            <Token color="punct">:</Token> <Token color="keyword">true</Token>
            {"\n"}
            <Token color="punct">{"}"}</Token>
          </code>
        </pre>
      </div>
    </div>
  );
}
