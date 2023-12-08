export default class Storefront {
  constructor() {
    const storefrontData = document.querySelector("[data-storefront]");
    if (!storefrontData) {
      // eslint-disable-next-line no-console
      console.error(
        "storefront/index.js: Could not locate Storefront credentials"
      );
    }

    this.data = JSON.parse(storefrontData.textContent);
    this.apiVersion = this.data.apiVersion;
    this.shopName = this.data.shopName;
    this.storefrontToken = this.data.storefrontToken;
    this.adminToken = this.data.adminToken;
  }

  static getInstance() {
    if (!this.instance) this.instance = new Storefront();
    return this.instance;
  }

  async request({ query, variables = {}, admin = false }) {
    const apiUrl = admin
      ? `https://${this.shopName}/admin/api/${this.apiVersion}/graphql.json`
      : `https://${this.shopName}/api/${this.apiVersion}/graphql.json`;
    const typeTocken = admin
      ? { "X-Shopify-Access-Token": this.adminToken }
      : { "X-Shopify-Storefront-Access-Token": this.storefrontToken };

    try {
      const response = await fetch(apiUrl, {
        headers: {
          ...typeTocken,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ query, variables }),
      });
      const data = await response.json();
      return data;
    } catch (error) {}
  }
}
