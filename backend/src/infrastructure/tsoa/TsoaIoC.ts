import { IocContainer, ServiceIdentifier } from 'tsoa';
import { container } from "tsyringe";

export const iocContainer: IocContainer = {
  get: <T>(controller: ServiceIdentifier<T>): T => {
    const childContainer = container.createChildContainer();
    return childContainer.resolve<T>(controller as never);
  },
};
