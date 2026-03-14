import { Redirect } from "expo-router";

export default function index() {
    return <Redirect href="/(protected)/(drawer)/filmes" />;
}