import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ValidationCustomPipe implements PipeTransform {
  // !value -> parameter is the currently processed method argument
  // !metadata -> is the currently processed method argument's metadata.
  transform(value: any, metadata: ArgumentMetadata) {
    return value;
  }
}
