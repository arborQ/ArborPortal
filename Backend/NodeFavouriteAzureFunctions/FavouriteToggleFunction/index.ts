import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { FavouriteModel, createRepository } from '../repository/favourites';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { parse as parseSearch } from 'query-string';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const favouritesRepository = await createRepository();

    const viewModel = new FavouriteModel();
    viewModel.storageKey = req.query['storageKey'];
    viewModel.itemId = req.query['itemId'];

    console.log(viewModel);

    const validationResult = await validate(viewModel);

    if (validationResult.length === 0) {
        const newItem = await favouritesRepository.create(viewModel);
        context.res = {
            body: newItem.url
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a name on the query string or in the request body"
        };
    }
};

export default httpTrigger;
