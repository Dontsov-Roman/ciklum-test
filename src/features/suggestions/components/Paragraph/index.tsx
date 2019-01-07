import * as React from "react";
import { withNamespaces, WithNamespaces } from "react-i18next";
import Button from "../../../../components/Button";
import Input from "../../../../components/Input";
import Text from "../../../../components/Text";
import Row, { Justify } from "../../../../components/Row";
import Column from "../../../../components/Column";
import Divider from "../../../../components/Divider";
import { IParagraph, ISuggestion } from "../../redux/reducer";

interface IProps extends WithNamespaces {
    paragraph: IParagraph;
    onChangeItem: (suggestion: ISuggestion) => void;
    onApprove: (item: ISuggestion) => void;
    onReject: (item: ISuggestion) => void;
    onApproveOwn: (item: ISuggestion) => void;
}
interface IState {
    showSuggestions: boolean;
    ownSuggestion: string;
}

class Paragraph extends React.Component<IProps, IState> {
    state = {
        showSuggestions: true,
        ownSuggestion: ""
    };
    render() {
        const { paragraph, onApprove, onReject, t, onApproveOwn } = this.props;
        const { showSuggestions, ownSuggestion } = this.state;
        return (
            <Column justify={Justify.Center}>
                <Text italic>{paragraph.originalText}</Text>
                <Divider />
                {showSuggestions &&
                    <Column justify={Justify.Center}>
                        {paragraph.data.map((suggestion, index) => (
                            <Column justify={Justify.Center} key={suggestion.id}>
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
                            ))
                        }
                        <Button onClick={() => this.setState({ showSuggestions: false })} >
                            {t("ownSuggestion")}
                        </Button>
                    </Column>
                }
                {!showSuggestions &&
                    <Column justify={Justify.Center}>
                        <Input
                            onChange={ownSuggestion => this.setState({ ownSuggestion })}
                            timeout={500}
                            defaultValue={ownSuggestion}
                        />
                        <Row>
                            <Button
                                primary
                                onClick={() => onApproveOwn({ ...paragraph, usersText: ownSuggestion })}
                            >
                                {t("approve")}
                            </Button>
                            <Button
                                onClick={() => this.setState({ showSuggestions: true })}
                            >
                                {t("showUsersSuggestions")}
                            </Button>
                        </Row>
                    </Column>
                }
            </Column>
        );
    }
}
export default withNamespaces()(Paragraph);