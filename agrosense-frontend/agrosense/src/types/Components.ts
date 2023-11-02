export type ScreenLayoutProps = {
    children: React.ReactNode;
    backgroundColor: 'secondary' | 'light' | 'dark';
    testId?: string;
    center?: boolean;
    spread?: boolean;
    start?: boolean;
    flex?: boolean;
}