import TicketsDAO from "../dao/mongo/managers/tickets.dao.js";

const ticketsDAO = new TicketsDAO();

class TicketsRepository {

  createTicket(ticket) {
    return ticketsDAO.createTicket(ticket);
  }

}

export const ticketsRepository = new TicketsRepository();