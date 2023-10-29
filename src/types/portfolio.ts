interface PortfolioData {
    _id: string,
    description:string,
            name: string,
            url: string,
            photo: {
                _id: string,
                name: string,
                user: string,
                __v:0
            },
}

export default PortfolioData