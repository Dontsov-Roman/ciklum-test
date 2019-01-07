export default interface IProps {
    onChange: (text: string) => void;
    timeout: number;
    defaultValue?: string;
    style?: any;
}