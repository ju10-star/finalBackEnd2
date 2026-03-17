import { ticketsRepository } from "../repositories/tickets.repository.js";
import { randomUUID } from "crypto";
import { generateCode } from "../utils/generateCode.js";
import { code } from "statuses";

class TicketsService {

  async createTicket(amount, purchaser) {

    const ticketData = {

      /* code: randomUUID(),*/
      code: generateCode(),
      amount,
      purchaser

    };

    return await ticketsRepository.createTicket(ticketData);

  }

}

export const ticketsService = new TicketsService();