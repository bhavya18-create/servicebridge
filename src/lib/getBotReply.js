export function getBotReply(message) {
  const lower = message.toLowerCase();
  const contains = (words) => words.some((word) => lower.includes(word));
  const budgetMatch = message.match(/(?:budget|under|₹|rs|rupees?)\s*([0-9,]+)/i);
  const budget = budgetMatch ? budgetMatch[1].replace(/,/g, '') : null;
  const serviceMatch = lower.match(/electrician|plumber|mechanic|cleaner|tutor|photographer|repair|healthcare/);
  const service = serviceMatch ? serviceMatch[0] : null;

  if (contains(['emergency', 'urgent', 'asap', 'right now', 'critical', 'immediately'])) {
    return 'This is urgent. I can dispatch a priority technician right away. Please confirm whether you need an electrician, plumber, or mechanic.';
  }
  if (contains(['quote', 'price', 'cost', 'estimate', 'charge'])) {
    if (service) {
      return `A ${service} service typically starts from ₹450 near your location. I can get a more precise quote if you tell me the exact task and area.`;
    }
    return 'I can compare quotes for you. Tell me the service type and location, for example: electrician in Mumbai or plumber in Pune.';
  }
  if (contains(['schedule', 'book', 'appointment', 'reserve', 'set up'])) {
    if (service) {
      return `I can book a ${service} for you. Please tell me your preferred date and time, and I will arrange it.`;
    }
    return 'I can schedule a service visit. What type of provider do you need and when would you like them to arrive?';
  }
  if (contains(['recommend', 'best', 'suggest', 'top', 'good provider'])) {
    if (service) {
      return `For ${service} work, I recommend a verified local provider with excellent ratings and fast availability.`;
    }
    return 'I recommend a highly rated local provider with fast availability. Tell me the service you need and I will narrow it down.';
  }
  if (service) {
    if (budget) {
      return `I can find a ${service} within ₹${budget}. Would you like a quote, availability details, or a booking?`;
    }
    return `I found nearby ${service} professionals. Would you like a quote, availability details, or to book one now?`;
  }
  if (contains(['near me', 'nearby', 'location', 'where', 'local'])) {
    return 'I can search nearby providers for you. Tell me the exact service you need and the city or area.';
  }
  if (contains(['discount', 'offer', 'deal', 'promo'])) {
    return 'I’m checking current promotions. Right now we have a 10% off offer for first-time verified provider bookings.';
  }
  if (contains(['help', 'assist', 'support'])) {
    return 'I can help with quotes, appointments, urgent service requests, or provider recommendations. What would you like to do?';
  }
  if (contains(['how much', 'what is the price', 'what is the cost', 'how much will'])) {
    return 'For a precise quote, please specify the service type and your location. I can then give you the most accurate estimate.';
  }
  if (contains(['how do i', 'how can i', 'how to'])) {
    return 'To book a service, tell me the job type and preferred date or time. I can then schedule it for you.';
  }

  return 'I can help you with service quotes, bookings, emergency dispatch, or provider recommendations. Tell me what you need.';
}
