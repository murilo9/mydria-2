import Controller from '../../system/types/Controller';
import IAssertiveController from '../../system/types/IAssertiveController';
import Result from '../../system/types/Result';
import ResultAsyncFunction from '../../system/types/ResultAsyncFunction';

export default class SignUpController extends Controller implements IAssertiveController {
  validator: ResultAsyncFunction;

  constructor(validator: ResultAsyncFunction) {
    super();
    this.validator = validator;
  }

  async handle(): Promise<Result<any>> {
    console.log('getting stuff');
    return {
      failed: false,
      payload: 'some stuff',
      statusCode: 200,
    };
  }
}
