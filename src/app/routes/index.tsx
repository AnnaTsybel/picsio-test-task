import React, { lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import { CommonLayout } from '@app/layouts/Common';

const HomePage = lazy(() => import('@views/Home/index'));
const PostsPage = lazy(() => import('@views/Posts'));
const PostPage = lazy(() => import('@views/Post'));

/**
 * Route describes location mapping with components.
 */
class Route {
    element: JSX.Element;
    constructor(
        public path: string,
        component: JSX.Element,
        public Layout: React.FC<{ children: React.ReactNode }> | null = CommonLayout,
        public children?: Route[],
        public fullPath: string = '',
    ) {
        this.element = Layout ? <Layout>{component}</Layout> : component;
    }

    /** Adds routes array to children field, changed each route to add fullPath property */
    public addChildren(children: Route[]): Route {
        children.forEach(child => { child.fullPath = `${this.path}/${child.path}`; });
        this.children = children;

        return this;
    }
};

/**
 * RoutesConfig contains information about all routes and subroutes.
 */
export class RoutesConfig {
    public static HomePage: Route = new Route('/', <HomePage />);
    public static PostsPage: Route = new Route('/posts', <PostsPage />);
    public static PostPage: Route = new Route('/posts/:id', <PostPage />);

    /** Routes is an array of logical router components */
    public static routes: Route[] = [
        RoutesConfig.HomePage,
        RoutesConfig.PostsPage,
        RoutesConfig.PostPage,
    ];
}

export const Routes = () => {
    const routes = useRoutes(RoutesConfig.routes);

    return routes;
};
