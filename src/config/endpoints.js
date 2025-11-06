const API = import.meta.env.VITE_API_URL;

export const invitationsUrl = (id) => `${API}/api/events/${id}/invitations`;

export const rsvpUrl = (id) => `${API}/api/events/${id}/guest`;