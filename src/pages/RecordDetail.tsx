import { useCdrDetail } from '@/hooks/useCDR'
import { useParams } from 'react-router-dom'

export default function RecordDetail() {
  const { id } = useParams()
  const numericId = Number(id)

  const { data, loading, error } = useCdrDetail(numericId)

  const formatTime = (ts: number) => new Date(ts).toLocaleString('en-US', { hour12: false })

  if (loading) return <div className="p-4">Loading...</div>
  if (error) return <div className="p-4 text-red-600">Error: {error}</div>
  if (!data) return <div className="p-4">No data found</div>

  return (
    <div className="w-full p-4">
      <h1 className="text-xl font-semibold mb-4">CDR Detail #{data.ID}</h1>

      <div className="rounded-lg border shadow-sm bg-white p-4">
        <table className="w-full text-sm">
          <tbody className="divide-y">
            {/* CALLER */}
            <Section title="Caller Information" />
            <Row label="Caller E164" value={data.Callere164} />
            <Row label="Caller Access E164" value={data.Calleraccesse164} />
            <Row label="Caller IP" value={data.CallerIP} />
            <Row label="Caller Gateway H323 ID" value={data.Callergatewayh323id} />
            <Row label="Caller Product ID" value={data.Callerproductid} />
            <Row label="→ Gateway E164" value={data.Callertogatewaye164} />

            {/* CALLEE */}
            <Section title="Callee Information" />
            <Row label="Callee E164" value={data.Calleee164} />
            <Row label="Callee Access E164" value={data.Calleeaccesse164} />
            <Row label="Callee IP" value={data.CalleeIP} />
            <Row label="Callee Gateway H323 ID" value={data.Calleegatewayh323id} />
            <Row label="Callee Product ID" value={data.Calleeproductid} />
            <Row label="→ Gateway E164" value={data.Calleetogatewaye164} />

            {/* BILLING */}
            <Section title="Billing" />
            <Row label="Billing Mode" value={data.Billingmode} />
            <Row label="Call Level" value={data.Calllevel} />
            <Row label="Fee Prefix" value={data.Feeprefix} />
            <Row label="Fee Time" value={data.Feetime} />
            <Row label="Fee" value={data.Fee} />
            <Row label="Suite Fee" value={data.Suitefee} />
            <Row label="Suite Fee Time" value={data.Suitefeetime} />
            <Row label="Income Fee" value={data.Incomefee} />
            <Row label="Callee Billing" value={data.Calleebilling} />
            <Row label="CDR Level" value={data.Cdrlevel} />

            {/* AGENT */}
            <Section title="Agent" />
            <Row label="Fee Prefix" value={data.Agentfeeprefix} />
            <Row label="Fee" value={data.Agentfee} />
            <Row label="Suite Fee" value={data.Agentsuitefee} />
            <Row label="Suite Fee Time" value={data.Agentsuitefeetime} />
            <Row label="Account" value={data.Agentaccount} />
            <Row label="Name" value={data.Agentname} />
            <Row label="Fee Time" value={data.Agentfeetime} />

            {/* TIMING */}
            <Section title="Call Timing" />
            <Row label="Start Time" value={formatTime(data.Starttime)} />
            <Row label="Stop Time" value={formatTime(data.Stoptime)} />
            <Row label="PDD" value={`${data.Pdd} ms`} />
            <Row label="Hold Time" value={`${data.Holdtime} sec`} />

            {/* MISC */}
            <Section title="Misc" />
            <Row label="Customer Account" value={data.Customeraccount} />
            <Row label="Customer Name" value={data.Customername} />
            <Row label="Flow No" value={data.Flowno} />
            <Row label="Softswitch DN" value={data.Softswitchdn} />
            <Row label="End Direction" value={data.Enddirection} />
            <Row label="End Reason" value={data.Endreason} />
            <Row label="Sub CDR ID" value={data.SubcdrID} />
          </tbody>
        </table>
      </div>
    </div>
  )
}

/* SECTION HEADER */
function Section({ title }: { title: string }) {
  return (
    <tr className="bg-gray-50">
      <td
        colSpan={2}
        className="py-2 px-2 text-sm font-semibold text-gray-700 uppercase tracking-wide"
      >
        {title}
      </td>
    </tr>
  )
}

/* ONE ROW */
function Row({ label, value }: { label: string; value: any }) {
  return (
    <tr className="hover:bg-gray-50">
      <td className="py-2 px-2 text-sm text-gray-600 w-1/3">{label}</td>
      <td className="py-2 px-2 text-base font-medium text-gray-900">{value ?? '-'}</td>
    </tr>
  )
}
