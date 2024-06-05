import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2'
import * as ecs from  'aws-cdk-lib/aws-ecs'
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class Mli10EcsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = ec2.Vpc.fromLookup(this,'ashuExistingVpc', {
      vpcId: 'vpc-063afa0c24ec80cb8'
    });
    // defining ECS cluster info 
    const cluster = new ecs.Cluster(this,'mli10-ecs-cluster',{
      clusterName: 'mli10-ecs-cdk', // change cluster name 
      vpc: vpc,
      enableFargateCapacityProviders: true ,
      containerInsights: true // enable cloudwatch monitoring 
    });
    // // add ec2 capacity 
    // cluster.addCapacity('defaultashuScaleGroup',{
    //   instanceType: new ec2.InstanceType("t2.small"),
    //   desiredCapacity: 1, // container instances
    //   minCapacity: 1,
    //   maxCapacity: 5
    // });

    // task Definition of farget launch type 
    const mli10TaskDef = new ecs.FargateTaskDefinition(this,'mli10',{
      cpu:  256,
      memoryLimitMiB: 512
       
    });
    // adding container info 
    const container = mli10TaskDef.addContainer('mli10cdkc1',{
      image: ecs.ContainerImage.fromRegistry('dockerashu/ashubmo:nginxuiv1'),
      memoryLimitMiB: 256,
      portMappings: [{ containerPort: 80 }]
    });
  }
}