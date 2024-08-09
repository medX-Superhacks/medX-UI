import { RadioGroup, RadioGroupItem } from '.';

export function RadioGroupDemo() {
    return (
        <RadioGroup
            defaultValue="no"
            className="flex items-center gap-x-4 pt-5"
        >
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="r1" />
                <label htmlFor="r1">Yes</label>
            </div>
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="r2" />
                <label htmlFor="r2">No</label>
            </div>
        </RadioGroup>
    );
}
