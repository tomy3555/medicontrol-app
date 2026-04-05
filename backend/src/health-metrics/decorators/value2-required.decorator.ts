import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'isValue2Required', async: false })
export class IsValue2Required implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const object = args.object as any;

    if (object.type === 'blood_pressure') {
      return typeof value === 'number' && value > 0;
    }

    return value === undefined;
  }

  defaultMessage(args: ValidationArguments) {
    const object = args.object as any;

    if (object.type === 'blood_pressure') {
      return 'value2 is required when type is blood_pressure';
    }

    return 'value2 should not be provided unless type is blood_pressure';
  }
}