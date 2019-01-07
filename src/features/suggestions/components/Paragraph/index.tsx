import * as React from "react";
import { withNamespaces, WithNamespaces } from "react-i18next";
import Button from "../../../../components/Button";
import Input from "../../../../components/Input";
import Text from "../../../../components/Text";
import Row from "../../../../components/Row";
import Column from "../../../../components/Column";
import { IParagraph, ISuggestion } from "../../redux/reducer";

interface IProps extends WithNamespaces {
    paragraph: IParagraph;
    onChangeItem: (suggestion: ISuggestion) => void;
    onApprove: (item: ISuggestion) => void;
    onReject: (item: ISuggestion) => void;
}
interface IState {
    showSuggestions: boolean;
}

class Paragraph extends React.Component<IProps, IState> {
    state = {
        showSuggestions: true
    };
    render() {
        const { paragraph, onApprove, onReject, onChangeItem, t } = this.props;
        const { showSuggestions } = this.state;
        return (
            <Column key={paragraph.paragraphId}>
                <Text>{paragraph.originalText}</Text>
                {showSuggestions && paragraph.data.map(suggestion => (
                    <Column key={suggestion.id}>
                        <Text>{suggestion.usersText}</Text>
                        <Row>
                            <Button
                                primary
                                disabled={suggestion.isApproved}
                                onClick={() => onApprove(suggestion)}
                            >
                                {t("approve")}
                            </Button>
                            <Button
                                secondary
                                disabled={suggestion.isApproved}
                                onClick={() => onReject(suggestion)}
                            >
                                {t("reject")}
                            </Button>
                        </Row>
                    </Column>
                ))}
                {!showSuggestions &&
                    <Column>
                        <Input
                            onChange={usersText => onChangeItem({ ...paragraph, usersText })}
                            timeout={500}
                            defaultValue={paragraph.originalText}
                        />
                    </Column>
                }
            </Column>
        );
    }
}
export default withNamespaces()(Paragraph);