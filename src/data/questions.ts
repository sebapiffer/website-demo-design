import { QuestionnaireSection } from "../types";

export const questionnaire: QuestionnaireSection[] = [
  {
    id: "identity",
    title: "ð IdentitÃ  e Anima del Brand",
    questions: [
      {
        id: "q1",
        text: "Quali sono i valori fondamentali del tuo brand e come vorresti che si riflettessero nel design del sito?",
        hint: "(Es. fiducia, innovazione, sostenibilitÃ , lusso, accessibilitÃ )"
      },
      {
        id: "q2",
        text: "Se dovessi descrivere l'estetica visiva del sito ideale con 3 o 4 aggettivi, quali sceglieresti?",
        hint: "(Es. minimale, moderno, accogliente, audace, istituzionale, geometrico)"
      },
      {
        id: "q3",
        text: "Chi sono i tuoi principali concorrenti e in che modo il design del tuo sito dovrebbe differenziarsi dal loro?",
        hint: "(Cosa vuoi evitare del loro stile e cosa invece vorresti fare meglio?)"
      }
    ]
  },
  {
    id: "visuals",
    title: "ð¨ Elementi Visivi e Colori",
    questions: [
      {
        id: "q4",
        text: "Esiste giÃ  una palette di colori ufficiale o ci sono tonalitÃ  specifiche che desideri assolutamente includere (o evitare)?",
        hint: "(Quali emozioni vorresti che questi colori trasmettessero ai visitatori?)"
      },
      {
        id: "q5",
        text: "Che tipo di tipografia (font) pensi si adatti meglio al tuo brand?",
        hint: "(Preferisci uno stile classico e con grazie [Serif], moderno e pulito [Sans-Serif], o qualcosa di piÃ¹ creativo e personalizzato?)"
      }
    ]
  },
  {
    id: "media",
    title: "ð¸ Immagini e Materiale Multimediale",
    questions: [
      {
        id: "q6",
        text: "Quale stile fotografico o illustrativo immagini per il sito?",
        hint: "(Preferisci foto reali e aziendali, immagini stock di alta qualitÃ , illustrazioni vettoriali minimali o grafiche astratte?)"
      },
      {
        id: "q7",
        text: "C'Ã¨ un elemento visivo specifico (un logo, un pattern, un'icona) che deve avere un ruolo centrale nel layout?"
      }
    ]
  },
  {
    id: "layout",
    title: "ð Layout e User Experience Visiva",
    questions: [
      {
        id: "q8",
        text: "Quali siti web (anche di settori completamente diversi) ti ispirano dal punto di vista puramente estetico?",
        hint: "(Cosa ti colpisce di piÃ¹ di quei siti: l'uso dello spazio bianco, le animazioni, la disposizione degli elementi?)"
      },
      {
        id: "q9",
        text: "Preferisci un layout ricco di informazioni visive o un design orientato al 'minimalismo' con molto spazio bianco?"
      },
      {
        id: "q10",
        text: "Quale 'atmosfera' generale deve respirare l'utente appena atterra sulla pagina?",
        hint: "(Es. un impatto visivo forte ed energico con animazioni dinamiche, oppure un'esperienza calma, fluida e rilassante?)"
      }
    ]
  }
];
