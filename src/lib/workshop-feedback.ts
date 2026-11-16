/**
 * Verbatim feedback from workshop attendees, taken from Mustafa's
 * "Visgrow Feedback from Workshop Attendees" survey compilation.
 *
 * Rules these follow (from the compilation's own publication notes):
 *
 * - Only respondents who explicitly answered Yes to the consent question.
 * - Wording is exactly as written, including spelling and grammar.
 * - Attributed as an anonymous participant of a named, dated event. The survey
 *   consent covers feedback on a website, but not names, job titles or logos,
 *   so none are used.
 * - Each quote comes from an individual attendee. None implies that the
 *   hosting organisation (StudyAdelaide, Solutions Plus, ACS) endorsed
 *   Visgrow. The organisation appears only as event context.
 *
 * Add more only with consent confirmed in the source survey.
 */

export type WorkshopQuote = { quote: string; source: string };

export const studyAdelaideFeedback: WorkshopQuote[] = [
  {
    quote:
      "All the information given is essential for our careers, how every single detail counts at the moment of finding a job or improving our professional profile.",
    source: "Participant, StudyAdelaide-associated workshop (2022)",
  },
  {
    quote:
      "It was very informative session. It helped me to realise my values and importance of my personal branding.",
    source: "Participant, StudyAdelaide-associated workshop (2022)",
  },
  {
    quote:
      "Really felt confident through the learning. Boosted confidence and ways to approach people",
    source: "Participant, StudyAdelaide-associated workshop (2022)",
  },
  {
    quote:
      "It was very interactive session. Learned a lot on soft skills. One of the best sessions I attended.",
    source: "Participant, StudyAdelaide-associated workshop (2022)",
  },
];

export const solutionsPlusFeedback: WorkshopQuote[] = [
  {
    quote: "The way it was presented and kept us engaged. Learnt a lot.",
    source: "Participant, workshop delivered for Solutions Plus (2022)",
  },
  {
    quote:
      "Napoleon hill quotes and how I can relate with what I think. It’s actually a confidence booster",
    source: "Participant, workshop delivered for Solutions Plus (2022)",
  },
  {
    quote: "How to be positively interactive with people.",
    source: "Participant, workshop delivered for Solutions Plus (2022)",
  },
];

export const acsFeedback: WorkshopQuote[] = [
  {
    quote:
      "Learnt a lot about landing a first IT job. The most important thing I will be working on LinkedIn.",
    source: "Participant, ACS career workshop (2022)",
  },
  {
    quote: "Knowing tips and meeting people from IT market were very insightful.",
    source: "Participant, ACS career workshop (2022)",
  },
  {
    quote:
      "Expand my networks and provide an insight of opportunity searching. As well as how to make me stand out of the candidates whilst seeking a new position.",
    source: "Participant, ACS career workshop (2022)",
  },
  {
    quote:
      "In this workshop, I came to know about the hidden job market, good resume and Linkedin profiles. How to do personal branding.",
    source: "Participant, ACS career workshop (2022)",
  },
];
