import * as pulumi from "@pulumi/pulumi";
import * as resources from "@pulumi/azure-nextgen/resources/v20200601";
import * as network from "@pulumi/azure-nextgen/network/v20200601";

// Create an Azure Resource Group
const resourceGroup = new resources.ResourceGroup("resourceGroup", {
    resourceGroupName: "josh-repro",
    location: "eastus2"
});

export const vnet = new network.VirtualNetwork("network", {
    resourceGroupName: resourceGroup.name,
    virtualNetworkName: "net",
    location: "eastus2",
    addressSpace: {
        addressPrefixes: ["10.0.0.0/16"]
    }
});

export const subnet = new network.Subnet("subnet", {
    resourceGroupName: resourceGroup.name,
    virtualNetworkName: vnet.name,
    subnetName: pulumi.interpolate`${vnet.name}-sub1`,
    addressPrefix: "10.0.0.0/24"
});
