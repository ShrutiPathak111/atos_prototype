import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Users, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  MessageSquare,
  Brain,
  FileText,
  CreditCard,
  Pill,
  Shield,
  Phone,
  Calendar,
  TrendingUp,
  Bell,
  Settings,
  Search,
  Filter,
  MoreVertical,
  User,
  MapPin,
  Zap,
  Target,
  Layers
} from 'lucide-react';

// Types
interface Patient {
  id: string;
  name: string;
  room: string;
  condition: string;
  admissionDate: string;
  predictedDischarge: string;
  confidence: number;
  status: 'monitoring' | 'ready' | 'processing' | 'approved' | 'discharged';
  vitals: {
    heartRate: number;
    bloodPressure: string;
    temperature: number;
    oxygenSat: number;
  };
  workflows: {
    billing: 'pending' | 'processing' | 'complete';
    pharmacy: 'pending' | 'processing' | 'complete';
    insurance: 'pending' | 'processing' | 'complete';
  };
  lastUpdate: string;
  doctor: string;
  estimatedCost: string;
}

interface Department {
  name: string;
  status: 'idle' | 'busy' | 'critical';
  activeRequests: number;
  avgProcessTime: string;
  efficiency: number;
}

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [patients, setPatients] = useState<Patient[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [notifications, setNotifications] = useState<number>(3);

  // Mock data initialization
  useEffect(() => {
    const mockPatients: Patient[] = [
      {
        id: 'PT001',
        name: 'Sarah Johnson',
        room: '302A',
        condition: 'Post-surgical recovery',
        admissionDate: '2025-01-15',
        predictedDischarge: '2025-01-20 14:30',
        confidence: 94,
        status: 'ready',
        vitals: { heartRate: 72, bloodPressure: '120/80', temperature: 98.6, oxygenSat: 98 },
        workflows: { billing: 'processing', pharmacy: 'complete', insurance: 'complete' },
        lastUpdate: '2 mins ago',
        doctor: 'Dr. Martinez',
        estimatedCost: '$12,450'
      },
      {
        id: 'PT002',
        name: 'Michael Chen',
        room: '205B',
        condition: 'Pneumonia treatment',
        admissionDate: '2025-01-17',
        predictedDischarge: '2025-01-22 10:15',
        confidence: 87,
        status: 'monitoring',
        vitals: { heartRate: 78, bloodPressure: '125/82', temperature: 99.2, oxygenSat: 95 },
        workflows: { billing: 'pending', pharmacy: 'processing', insurance: 'pending' },
        lastUpdate: '5 mins ago',
        doctor: 'Dr. Kim',
        estimatedCost: '$8,200'
      },
      {
        id: 'PT003',
        name: 'Emma Rodriguez',
        room: '410C',
        condition: 'Appendectomy',
        admissionDate: '2025-01-18',
        predictedDischarge: '2025-01-21 16:00',
        confidence: 91,
        status: 'processing',
        vitals: { heartRate: 68, bloodPressure: '115/75', temperature: 98.4, oxygenSat: 99 },
        workflows: { billing: 'complete', pharmacy: 'complete', insurance: 'processing' },
        lastUpdate: '1 min ago',
        doctor: 'Dr. Wilson',
        estimatedCost: '$15,680'
      }
    ];

    const mockDepartments: Department[] = [
      { name: 'Billing', status: 'busy', activeRequests: 8, avgProcessTime: '45m', efficiency: 92 },
      { name: 'Pharmacy', status: 'idle', activeRequests: 2, avgProcessTime: '15m', efficiency: 98 },
      { name: 'Insurance', status: 'busy', activeRequests: 12, avgProcessTime: '1.2h', efficiency: 87 },
      { name: 'Lab Results', status: 'idle', activeRequests: 1, avgProcessTime: '25m', efficiency: 95 },
      { name: 'Transport', status: 'critical', activeRequests: 15, avgProcessTime: '35m', efficiency: 78 }
    ];

    setPatients(mockPatients);
    setDepartments(mockDepartments);
  }, []);

  const getStatusColor = (status: Patient['status']) => {
    switch (status) {
      case 'monitoring': return 'text-blue-600 bg-blue-100';
      case 'ready': return 'text-green-600 bg-green-100';
      case 'processing': return 'text-yellow-600 bg-yellow-100';
      case 'approved': return 'text-purple-600 bg-purple-100';
      case 'discharged': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getDepartmentStatusColor = (status: Department['status']) => {
    switch (status) {
      case 'idle': return 'text-green-600 bg-green-100';
      case 'busy': return 'text-yellow-600 bg-yellow-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Patients</p>
              <p className="text-2xl font-bold text-gray-900">24</p>
              <p className="text-xs text-green-600 flex
  )
} items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                +2 from yesterday
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Ready for Discharge</p>
              <p className="text-2xl font-bold text-gray-900">7</p>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <Target className="w-3 h-3 mr-1" />
                94% accuracy
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Processing Time</p>
              <p className="text-2xl font-bold text-gray-900">2.4h</p>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <Clock className="w-3 h-3 mr-1" />
                -15min improvement
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">AI Confidence</p>
              <p className="text-2xl font-bold text-gray-900">92%</p>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <Brain className="w-3 h-3 mr-1" />
                High accuracy
              </p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <Brain className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Patient List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Patient Discharge Pipeline</h3>
            <div className="flex items-center space-x-3">
              <button className="flex items-center space-x-2 px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Filter className="w-4 h-4" />
                <span>Filter</span>
              </button>
              <button className="flex items-center space-x-2 px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Search className="w-4 h-4" />
                <span>Search</span>
              </button>
            </div>
          </div>
        </div>
        <div className="divide-y divide-gray-200">
          {patients.map((patient) => (
            <div key={patient.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900">{patient.name}</h4>
                    <p className="text-sm text-gray-600">Room {patient.room} • {patient.condition}</p>
                    <p className="text-xs text-gray-500 mt-1">Dr. {patient.doctor} • {patient.lastUpdate}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <p className="text-xs text-gray-500">Predicted Discharge</p>
                    <p className="text-sm font-medium text-gray-900">{patient.predictedDischarge.split(' ')[1]}</p>
                    <p className="text-xs text-gray-600">{patient.predictedDischarge.split(' ')[0]}</p>
                  </div>

                  <div className="text-center">
                    <p className="text-xs text-gray-500">AI Confidence</p>
                    <p className="text-sm font-medium text-green-600">{patient.confidence}%</p>
                    <div className="w-16 h-1 bg-gray-200 rounded-full mt-1">
                      <div 
                        className="h-1 bg-green-500 rounded-full" 
                        style={{ width: `${patient.confidence}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(patient.status)}`}>
                      {patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
                    </div>
                    {patient.status === 'ready' && (
                      <button className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors">
                        Approve Discharge
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Workflow Status */}
              <div className="mt-4 flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <CreditCard className="w-4 h-4 text-gray-400" />
                  <span className="text-xs text-gray-600">Billing:</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    patient.workflows.billing === 'complete' ? 'bg-green-100 text-green-600' :
                    patient.workflows.billing === 'processing' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {patient.workflows.billing}
                  </span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Pill className="w-4 h-4 text-gray-400" />
                  <span className="text-xs text-gray-600">Pharmacy:</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    patient.workflows.pharmacy === 'complete' ? 'bg-green-100 text-green-600' :
                    patient.workflows.pharmacy === 'processing' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {patient.workflows.pharmacy}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-gray-400" />
                  <span className="text-xs text-gray-600">Insurance:</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    patient.workflows.insurance === 'complete' ? 'bg-green-100 text-green-600' :
                    patient.workflows.insurance === 'processing' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {patient.workflows.insurance}
                  </span>
                </div>

                <div className="text-xs text-gray-600">
                  Est. Cost: <span className="font-medium">{patient.estimatedCost}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderMonitoring = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Real-time Patient Monitoring</h3>
          <div className="flex items-center space-x-2 text-green-600">
            <Activity className="w-4 h-4" />
            <span className="text-sm font-medium">Live Data</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {patients.map((patient) => (
            <div key={patient.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-medium text-gray-900">{patient.name}</h4>
                  <p className="text-sm text-gray-600">Room {patient.room}</p>
                </div>
                <div className={`w-3 h-3 rounded-full ${
                  patient.status === 'monitoring' ? 'bg-blue-500 animate-pulse' : 
                  patient.status === 'ready' ? 'bg-green-500' : 'bg-yellow-500'
                }`}></div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Heart Rate</span>
                  <span className="text-sm font-medium">{patient.vitals.heartRate} BPM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Blood Pressure</span>
                  <span className="text-sm font-medium">{patient.vitals.bloodPressure}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Temperature</span>
                  <span className="text-sm font-medium">{patient.vitals.temperature}°F</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Oxygen Sat</span>
                  <span className="text-sm font-medium">{patient.vitals.oxygenSat}%</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">AI Prediction</span>
                  <span className="text-xs font-medium text-green-600">{patient.confidence}% confident</span>
                </div>
                <p className="text-xs text-gray-600 mt-1">Ready for discharge: {patient.predictedDischarge}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAICoordinator = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">AI Department Coordinator</h3>
          <div className="flex items-center space-x-2 text-purple-600">
            <Zap className="w-4 h-4" />
            <span className="text-sm font-medium">Active</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {departments.map((dept) => (
            <div key={dept.name} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-900">{dept.name}</h4>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${getDepartmentStatusColor(dept.status)}`}>
                  {dept.status}
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Active Requests</span>
                  <span className="font-medium">{dept.activeRequests}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Avg Process Time</span>
                  <span className="font-medium">{dept.avgProcessTime}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Efficiency</span>
                  <span className="font-medium text-green-600">{dept.efficiency}%</span>
                </div>
              </div>

              <div className="mt-3">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${dept.efficiency}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-purple-50 rounded-lg p-6">
          <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
            <Brain className="w-5 h-5 mr-2 text-purple-600" />
            AI Coordinator Activity
          </h4>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-600">Automatically initiated pharmacy orders for 3 patients</span>
              <span className="text-gray-400">2 mins ago</span>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-gray-600">Coordinated billing review for PT001 - Sarah Johnson</span>
              <span className="text-gray-400">5 mins ago</span>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span className="text-gray-600">Prioritized transport requests due to high demand</span>
              <span className="text-gray-400">8 mins ago</span>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-gray-600">Predicted discharge bottleneck in insurance - allocated additional resources</span>
              <span className="text-gray-400">12 mins ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPatientComm = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Patient Communication Hub</h3>
          <div className="flex items-center space-x-2 text-blue-600">
            <MessageSquare className="w-4 h-4" />
            <span className="text-sm font-medium">24/7 Active</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Recent Patient Interactions</h4>
            
            <div className="space-y-3">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">Sarah Johnson</span>
                      <span className="text-xs text-gray-500">2 mins ago</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">"When can I expect to go home?"</p>
                    <div className="mt-2 text-xs text-blue-600 bg-blue-100 inline-block px-2 py-1 rounded">
                      AI Response: "Based on your recovery progress, you're scheduled for discharge tomorrow at 2:30 PM. All your paperwork is being prepared automatically."
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">Michael Chen</span>
                      <span className="text-xs text-gray-500">15 mins ago</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">"Do I need to bring anything for discharge?"</p>
                    <div className="mt-2 text-xs text-green-600 bg-green-100 inline-block px-2 py-1 rounded">
                      AI Response: "Please bring your ID and insurance card. Your medications will be ready at the pharmacy by 10 AM."
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">Emma Rodriguez</span>
                      <span className="text-xs text-gray-500">32 mins ago</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">"What's my final bill amount?"</p>
                    <div className="mt-2 text-xs text-purple-600 bg-purple-100 inline-block px-2 py-1 rounded">
                      AI Response: "Your insurance has been processed. Your final cost after coverage is $1,680. Payment options have been sent to your mobile."
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Automated Notifications Sent</h4>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Phone className="w-4 h-4 text-blue-600" />
                <div className="flex-1">
                  <p className="text-sm text-gray-900">Discharge reminder sent to Sarah Johnson</p>
                  <p className="text-xs text-gray-500">SMS + Email • 1 hour ago</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Calendar className="w-4 h-4 text-green-600" />
                <div className="flex-1">
                  <p className="text-sm text-gray-900">Follow-up appointment scheduled for Michael Chen</p>
                  <p className="text-xs text-gray-500">Calendar invite sent • 2 hours ago</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <CreditCard className="w-4 h-4 text-purple-600" />
                <div className="flex-1">
                  <p className="text-sm text-gray-900">Billing summary sent to Emma Rodriguez</p>
                  <p className="text-xs text-gray-500">Email + Patient Portal • 3 hours ago</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Pill className="w-4 h-4 text-orange-600" />
                <div className="flex-1">
                  <p className="text-sm text-gray-900">Medication instructions sent to all patients</p>
                  <p className="text-xs text-gray-500">SMS notifications • 4 hours ago</p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h5 className="font-medium text-blue-900 mb-2">Chatbot Performance</h5>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-blue-700">Response Time</p>
                  <p className="font-semibold text-blue-900">{'< 2 seconds'}</p>
                </div>
                <div>
                  <p className="text-blue-700">Satisfaction Rate</p>
                  <p className="font-semibold text-blue-900">96%</p>
                </div>
                <div>
                  <p className="text-blue-700">Issues Resolved</p>
                  <p className="font-semibold text-blue-900">87% without human</p>
                </div>
                <div>
                  <p className="text-blue-700">Active Conversations</p>
                  <p className="font-semibold text-blue-900">12 ongoing</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity },
    { id: 'monitoring', label: 'Live Monitoring', icon: Activity },
    { id: 'ai-coordinator', label: 'AI Coordinator', icon: Brain },
    { id: 'patient-comm', label: 'Patient Communication', icon: MessageSquare }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Layers className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">AI Discharge System</h1>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <Bell className="w-5 h-5" />
                </button>
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Settings className="w-5 h-5" />
              </button>
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-blue-600" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'monitoring' && renderMonitoring()}
        {activeTab === 'ai-coordinator' && renderAICoordinator()}
        {activeTab === 'patient-comm' && renderPatientComm()}
      </main>
    </div>
  );
}

export default App;