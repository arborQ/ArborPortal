using System;
using System.Threading.Tasks;

namespace ExternalUsersIntegrationService
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello World!");

            Task.Run(StartQuartz.Start);
            Console.ReadLine();
        }
    }
}
