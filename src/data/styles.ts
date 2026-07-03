import { StyleCategory } from "../types";

export const styleCategories: StyleCategory[] = [
  {
    id: "clean-structural",
    title: "1. Clean & Structural Styles",
    description: "Stili focalizzati su ordine, geometria, usabilitÃ  e riduzione degli elementi superflui.",
    substyles: [
      {
        id: "classic-minimalism",
        name: "Minimalismo Classico",
        description: "Grandi quantitÃ  di spazio negativo (spazio bianco), palette monocromatiche e una forte attenzione alla tipografia pulita."
      },
      {
        id: "hyper-minimalism",
        name: "Iper-Minimalismo",
        description: "Estrema riduzione dei componenti grafici, spesso basandosi quasi esclusivamente su testo puro e interfacce utente quasi invisibili."
      },
      {
        id: "bento-grid",
        name: "Bento Grid Design",
        description: "Organizzazione dei contenuti in scomparti rettangolari o quadrati arrotondati e puliti, resi popolari dalle interfacce di dashboard di Apple e Microsoft."
      },
      {
        id: "flat-design",
        name: "Flat Design",
        description: "Un'estetica bidimensionale priva di gradienti, riflessi, ombre esterne o texture complesse."
      }
    ]
  },
  {
    id: "experimental-radical",
    title: "2. Experimental, Radical & Anti-Design Styles",
    description: "Stili all'avanguardia che infrangono deliberatamente le regole tradizionali di UX/UI per generare un alto impatto visivo e un branding memorabile.",
    substyles: [
      {
        id: "pure-brutalism",
        name: "Brutalismo Puro (Anti-Design)",
        description: "Strutture grezze, HTML 'nudo' non stilizzato, layout asimmetrici, contrasti cromatici stridenti e interfacce intenzionalmente difficili da navigare."
      },
      {
        id: "neobrutalism",
        name: "Neobrutalismo (Brutalismo Tattile)",
        description: "Un'evoluzione commercializzata del brutalismo caratterizzata da spessi tratti neri, riempimenti pastello o neon vibranti, ombre esterne nette senza sfocatura e tipografia audace sans-serif o monospace."
      },
      {
        id: "acid-graphic",
        name: "Acid Graphic / Tecno-Massimalismo",
        description: "Sovrapposizione caotica di elementi, gradienti psichedelici, texture metalliche o liquide, sovraccarico sensoriale interattivo e complessa tipografia cinetica."
      }
    ]
  },
  {
    id: "skeuomorphic",
    title: "3. Skeuomorphic & Material-Based Styles",
    description: "Stili basati sulla simulazione visiva di materiali fisici, profonditÃ , illuminazione e texture del mondo reale.",
    substyles: [
      {
        id: "classic-skeuomorphism",
        name: "Skeuomorfismo Classico",
        description: "Fedele replica digitale di texture del mondo reale (come cruscotti in pelle, metallo spazzolato o pulsanti fisici smussati)."
      },
      {
        id: "neumorphism",
        name: "Neumorfismo (Soft UI)",
        description: "Interfacce in cui i componenti si fondono senza soluzione di continuitÃ  con lo sfondo attraverso morbide ombreggiature interne ed esterne, creando un aspetto di plastica estrusa o argilla modellata."
      },
      {
        id: "glassmorphism",
        name: "Glassmorfismo",
        description: "Un'estetica a vetro satinato o semi-trasparente che utilizza la sfocatura dello sfondo per separare i livelli attivi dell'interfaccia utente."
      },
      {
        id: "claymorphism",
        name: "Claymorfismo",
        description: "Elementi 3D morbidi e amichevoli che ricordano la plastilina, tipicamente abbinati a ombre interne per dare un senso di volume e morbidezza."
      }
    ]
  },
  {
    id: "nostalgic-editorial",
    title: "4. Nostalgic & Editorial Styles",
    description: "Stili che evocano epoche passate del design analogico e della stampa digitale, dando prioritÃ  alla narrazione, all'ereditÃ  o alla nostalgia tecnologica.",
    substyles: [
      {
        id: "editorial-magazine",
        name: "Design Editoriale / Magazine",
        description: "Layout a griglia asimmetrici ma rigorosi che imitano le tradizionali riviste di lusso, ampio uso di elegante tipografia Serif e fotografia di alta moda."
      },
      {
        id: "vintage-retro",
        name: "Vintage / RetrÃ² (Mid-Century & 70s)",
        description: "Palette di colori caldi e desaturati (crema, senape, toni della terra), pesanti texture di grana/rumore e imperfezioni di stampa analogica."
      },
      {
        id: "y2k",
        name: "Y2K / Cyber-Nostalgia",
        description: "Linguaggio visivo ispirato alla fine degli anni '90 e ai primi anni 2000; sfondi matrix lo-fi, pixel art, texture cromate iridescenti e vibrazioni dei primi portali web."
      }
    ]
  },
  {
    id: "artistic-illustrative",
    title: "5. Artistic & Illustrative Styles",
    description: "Stili incentrati su componenti artistici personalizzati, artigianali e incentrati sull'uomo.",
    substyles: [
      {
        id: "hand-drawn",
        name: "Stile Disegnato a Mano / Doodle",
        description: "Elementi organici schizzati a mano, icone deliberatamente imperfette, frecce dinamiche di richiamo e caratteri tipografici scritti a mano o stencil."
      },
      {
        id: "corporate-memphis",
        name: "Vettoriale / Corporate Memphis",
        description: "Illustrazioni vettoriali geometriche pulite con personaggi stilizzati dalle proporzioni esagerate."
      }
    ]
  }
];
