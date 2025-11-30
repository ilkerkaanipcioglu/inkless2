import { internalMutation } from "./_generated/server";

export const updateFaqs = internalMutation({
  args: {},
  handler: async (ctx) => {
    // 1. Delete existing FAQs
    const existing = await ctx.db.query("faqs").collect();
    for (const item of existing) {
      await ctx.db.delete(item._id);
    }

    // 2. Add new FAQs
    const faqs = [
      {
        question: "How does laser tattoo removal work?",
        answer: "Laser tattoo removal utilizes ultra-short pulses of energy (one picosecond = one trillionth of a second = one millionth of one millionth of a second) to break down tattoo ink into tiny particles. This advanced laser technology allows the body's immune system to naturally absorb and remove these particles. Our state-of-the-art laser systems ensure that this non-invasive procedure doesn't burn or damage the targeted skin, leaving you without scars after the area has healed.",
        order: 1,
      },
      {
        question: "How much does laser tattoo removal cost?",
        answer: "We offer affordable pricing for laser tattoo removal in Kenya. One session costs 5,000 KES. We also provide flexible payment options with package deals:\n\n- 2 sessions package: 9,000 KES\n- 5 session package: 20,000 KES\n- Unlimited Sessions Package (until all ink is gone): 35,000 KES\n\nA minimum of 3 laser treatments for tattoo removal is typically required, and 5 sessions can be enough for complete tattoo removal of a standard tattoo. For thick and multiple tattoos, many clients opt for the Unlimited Sessions Package. Our pricing is based per session, regardless of tattoo size or the number of tattoos to be removed.",
        order: 2,
      },
      {
        question: "Does laser tattoo removal hurt?",
        answer: "The sensation is often described as similar to getting a new tattoo. However, sessions only take a few minutes, and a numbing cream can be used for hypersensitive individuals. Laser tattoo removal is the most effective removal process available. While pain-free methods may not effectively remove ink, our Picosecond lasers cause less discomfort than most other tattoo removal techniques. It's also faster, reducing the time spent experiencing minor pain during the procedure.",
        order: 3,
      },
      {
        question: "Does laser tattoo removal leave scars?",
        answer: "Our advanced laser technology uses short pulses of energy to break down the ink without burning or damaging the targeted skin. After the area has healed, you won't be left with a scar. Our experienced technicians provide clear guidelines for aftercare, which plays a substantial role in avoiding scarring and other preventable side effects.",
        order: 4,
      },
      {
        question: "How long will it take to get my tattoo completely removed?",
        answer: "Thanks to the amazing science of Picosecond laser technology, we can now actually undo a tattoo completely. Our laser tattoo removal process can remove all types of tattoos, including professional tattoos and amateur tattoos, leaving no blemishes, ink, or signs on the skin whatsoever.\n\nThe duration of the tattoo removal process depends on various factors such as tattoo colors, tattoo size, and tattoo complexity. You'll need to wait 4 weeks between sessions, and most tattoos require between 5 and 12 sessions for complete tattoo removal. Our personalized approach takes into account your specific tattoo and skin type considerations to create customizable treatment plans.",
        order: 5,
      },
      {
        question: "Where are you located?",
        answer: "For those searching for \"tattoo removal near me\" in Kenya, we are conveniently located in Two Rivers Mall, 1st floor NAIROBI, KENYA. Our studio specializes in laser tattoo removal in Nairobi, offering services like eyebrow tattoo removal and treatment for various tattoo colors including black ink removal, blue ink removal and green ink removal.\n\nWe're available on social platforms and can be reached at the following number: +254 708 901 505\n\nExperience the difference of our advanced picosecond laser technology and experienced technicians for your tattoo removal needs in Kenya.",
        order: 6,
      },
    ];

    for (const faq of faqs) {
      await ctx.db.insert("faqs", faq);
    }

    return `Updated ${faqs.length} FAQs`;
  },
});
