const API = import.meta.env.VITE_API_URL;

export const invitationsUrl = (id) => `${API}/invitations/${id}`;

export const rsvpUrl = (id) => `${API}/invitations/${id}/rsvp`;