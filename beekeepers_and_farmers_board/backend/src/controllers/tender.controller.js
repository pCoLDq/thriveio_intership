const TenderService = require('../services/tender.service');

class TenderController {
  async createTender(request, response) {
    const authtoken = request.cookies['AuthToken'];
    console.log("authcontroller.getUserData: request.cookies['AuthToken']", authtoken);
    if (!authtoken) {
      response.sendStatus(401); // unauthorized
      return;
    }

    const farmerId = await TenderService.getFarmerIdByAuthtoken(authtoken);
    if (!farmerId) {
      response.sendStatus(401); // user isnt farmer
      return;
    }

    const { requiredNumOfHives, salary } = request.body;
    if (!requiredNumOfHives || !salary || salary < 0 || requiredNumOfHives < 0) {
      response.sendStatus(400); //pseudo validation
      return;
    }

    await TenderService.insertTender(farmerId, requiredNumOfHives, salary);
    console.log('tender created');
    response.sendStatus(201);
    return;
  }

  async getAllTenders(request, response) {
    const allTenders = await TenderService.selectAllTenders();
    if (allTenders[0]) {
      response.status(200).send(allTenders);
      return;
    }
    response.sendStatus(404); // no content
  }

  async updateTender(request, response) {
    const { id, status, requiredNumOfHives, beekeeperWinnerId, salary } = request.body;
    if (!id) {
      response.sendStatus(400); // bad request
      return;
    }

    const isCredentials = await TenderService.isTheUserOwnerOfTender(request);
    if (!isCredentials) {
      response.sendStatus(403); // user doesnt have rights to tender
      return;
    }

    if (status) {
      await TenderService.updateTenderStatus(id, status);
    }
    if (requiredNumOfHives) {
      await TenderService.updateTenderRequiredNumOfHives(id, requiredNumOfHives);
    }
    if (beekeeperWinnerId) {
      await TenderService.updateTenderBeekeeperWinnerId(id, beekeeperWinnerId);
    }
    if (salary) {
      await TenderService.updateTenderSalary(id, salary);
    }
    response.sendStatus(200);
  }

  async deleteTender(request, response) {
    const tenderId = request.query.id;
    console.log(tenderId);
    if (!tenderId) {
      response.sendStatus(400); // bad request
      return;
    }

    const isCredentials = await TenderService.isTheUserOwnerOfTender(request);
    if (!isCredentials) {
      response.sendStatus(403); // user doesnt have rights to tender
      return;
    }

    await TenderService.deleteTender(tenderId);
    response.sendStatus(200);
    return;
  }
}

module.exports = new TenderController();
