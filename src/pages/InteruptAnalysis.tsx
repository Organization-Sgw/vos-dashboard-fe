import FilterInput from '@/components/FilterInput'
import GatewayTable from '@/components/TableInterupt'

const sampleTable = [
  { gatewayId: 'GW-01', ip: '192.168.1.10', terminationReason: 'CallerHangup', totalCall: 120 },
  { gatewayId: 'GW-02', ip: '192.168.1.20', terminationReason: 'UserBusy', totalCall: 80 },
  { gatewayId: 'GW-03', ip: '10.0.0.33', terminationReason: 'Forbidden', totalCall: 50 },
]

export default function InteruptAnalysisPages() {
  return (
    <div className="w-full  min-h-screen">
      <FilterInput />
      {/* Dashboard Charts */}
      <div className="flex flex-wrap gap-4 ">
        <GatewayTable data={sampleTable} />
      </div>
    </div>
  )
}
