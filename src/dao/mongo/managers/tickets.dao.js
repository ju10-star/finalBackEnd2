import { TicketModel } from "../models/ticket.model.js";

export default class TicketsDAO {

  async createTicket(ticket) {
    return await TicketModel.create(ticket);
  }

}