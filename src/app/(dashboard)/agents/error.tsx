"use client";

import { ErrorState } from "@/components/error-state";

const ErrorPage = () => {
    return (
        <ErrorState
            title="Oops failed loading Agents"
            description="Please try again"
        />
    )
}

export default ErrorPage;