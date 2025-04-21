import { Phone, Hospital, Shield, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function EmergencyContacts({ destination }) {
  // Mock emergency contact data based on destination
  const getEmergencyContacts = (destination) => {
    const lowerDestination = destination.toLowerCase()

    // Default emergency numbers for India
    const defaultContacts = {
      police: "100",
      ambulance: "108",
      fire: "101",
      emergency: "112",
      touristPolice: "1363",
      hospitals: [{ name: "General Hospital", phone: "+91-XXXX-XXXXXX" }],
      embassies: [],
      safetyTips: [
        "Keep your valuables secure and be aware of your surroundings",
        "Carry a copy of your ID/passport and keep the original in a safe place",
        "Save emergency contacts on your phone",
        "Register with your country's embassy if traveling internationally",
      ],
    }

    // Destination-specific contacts
    if (lowerDestination.includes("goa")) {
      return {
        ...defaultContacts,
        touristPolice: "0832-2428383",
        hospitals: [
          { name: "Goa Medical College", phone: "+91-832-2458727" },
          { name: "Manipal Hospital, Goa", phone: "+91-832-2456789" },
        ],
        safetyTips: [
          ...defaultContacts.safetyTips,
          "Be cautious while swimming in the sea, follow lifeguard instructions",
          "Avoid isolated beaches after dark",
        ],
      }
    } else if (lowerDestination.includes("delhi")) {
      return {
        ...defaultContacts,
        touristPolice: "1800-111-363",
        hospitals: [
          { name: "AIIMS Delhi", phone: "+91-11-26588500" },
          { name: "Fortis Hospital", phone: "+91-11-4277-6222" },
        ],
        safetyTips: [
          ...defaultContacts.safetyTips,
          "Use registered taxis or ride-sharing services",
          "Avoid traveling alone at night in unfamiliar areas",
        ],
      }
    } else if (lowerDestination.includes("mumbai")) {
      return {
        ...defaultContacts,
        touristPolice: "022-22621855",
        hospitals: [
          { name: "Lilavati Hospital", phone: "+91-22-2675-1000" },
          { name: "Breach Candy Hospital", phone: "+91-22-2366-7888" },
        ],
        safetyTips: [
          ...defaultContacts.safetyTips,
          "Be cautious during monsoon season (June-September)",
          "Use metered taxis or ride-sharing services",
        ],
      }
    }

    return defaultContacts
  }

  const emergencyInfo = getEmergencyContacts(destination)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-red-500" />
          Emergency Contacts & Safety Information
        </CardTitle>
        <CardDescription>Important contacts and safety tips for your trip to {destination}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2 rounded-lg border p-3">
            <h3 className="flex items-center gap-2 font-medium">
              <Phone className="h-4 w-4 text-primary" />
              Emergency Numbers
            </h3>
            <ul className="space-y-1 text-sm">
              <li className="flex justify-between">
                <span>Police:</span>
                <span className="font-medium">{emergencyInfo.police}</span>
              </li>
              <li className="flex justify-between">
                <span>Ambulance:</span>
                <span className="font-medium">{emergencyInfo.ambulance}</span>
              </li>
              <li className="flex justify-between">
                <span>Fire:</span>
                <span className="font-medium">{emergencyInfo.fire}</span>
              </li>
              <li className="flex justify-between">
                <span>Tourist Police:</span>
                <span className="font-medium">{emergencyInfo.touristPolice}</span>
              </li>
              <li className="flex justify-between">
                <span>Emergency Helpline:</span>
                <span className="font-medium">{emergencyInfo.emergency}</span>
              </li>
            </ul>
          </div>

          <div className="space-y-2 rounded-lg border p-3">
            <h3 className="flex items-center gap-2 font-medium">
              <Hospital className="h-4 w-4 text-primary" />
              Nearby Hospitals
            </h3>
            <ul className="space-y-1 text-sm">
              {emergencyInfo.hospitals.map((hospital, index) => (
                <li key={index} className="flex flex-col">
                  <span className="font-medium">{hospital.name}</span>
                  <span className="text-muted-foreground">{hospital.phone}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rounded-lg border p-3">
          <h3 className="flex items-center gap-2 font-medium">
            <Shield className="h-4 w-4 text-primary" />
            Safety Tips
          </h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
            {emergencyInfo.safetyTips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
