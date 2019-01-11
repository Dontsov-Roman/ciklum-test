import * as React from "react";
import { WithNamespaces, withNamespaces } from "react-i18next";
import Loader from "../../../components/Loader";
import Centered from "../../../components/Centered";
import Button from "../../../components/Button";
import { ILazyLoadState } from "../../../redux/reducers/factory";
import { IFactoryLazyLoad } from "../../../redux/actions/factory";
import { IParamsLazyLoad } from "../../../repository/IRepository";

interface IWithLazyLoad extends ILazyLoadState, WithNamespaces {
    getMore: (params: IParamsLazyLoad) => void;
    [key: string]: any;
}

const withLazyLoad = (Component: React.ComponentType<any>) =>
    class WithLoading extends React.Component<IWithLazyLoad> {
        static defaultProps = {
            fetchingLazyLoad: false,
        };
        render() {
            const { fetchingLazyLoad, t, getMore, page, per_page, ...props } = this.props;
            console.warn({ per_page, page });
            return fetchingLazyLoad ? (
                <Centered><Loader size={90} /></Centered>
            ) : (
                <div>
                    <Component t={t} {...props} />
                    <Button onClick={() => getMore({ per_page, page })}>
                        {t("getMore")}
                    </Button>
                </div>
            );
        }
};
export default (
    Component: React.ComponentType<any>
) => withNamespaces()(withLazyLoad(Component));