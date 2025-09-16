import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { FileText, TrendingUp, Users, Calendar, Download, Filter } from "lucide-react";

const auditsByMonth = [
  { month: 'Jan', audits: 12, completed: 10 },
  { month: 'Fév', audits: 15, completed: 13 },
  { month: 'Mar', audits: 18, completed: 16 },
  { month: 'Avr', audits: 22, completed: 20 },
  { month: 'Mai', audits: 25, completed: 22 },
  { month: 'Jun', audits: 28, completed: 25 },
];

const auditsByType = [
  { name: 'Sécurité IT', value: 35, color: '#3b82f6' },
  { name: 'RGPD', value: 25, color: '#10b981' },
  { name: 'Infrastructure', value: 20, color: '#f59e0b' },
  { name: 'Processus', value: 15, color: '#ef4444' },
  { name: 'Autres', value: 5, color: '#8b5cf6' },
];

const performanceData = [
  { month: 'Jan', avgDuration: 15, satisfaction: 4.2 },
  { month: 'Fév', avgDuration: 14, satisfaction: 4.3 },
  { month: 'Mar', avgDuration: 13, satisfaction: 4.4 },
  { month: 'Avr', avgDuration: 12, satisfaction: 4.5 },
  { month: 'Mai', avgDuration: 11, satisfaction: 4.6 },
  { month: 'Jun', avgDuration: 10, satisfaction: 4.7 },
];

const AnalyticsPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("6months");
  const [selectedMetric, setSelectedMetric] = useState("all");

  return (
    <Layout>
      <div className="container py-8 px-4 mx-auto max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Analytics</h1>
            <p className="text-muted-foreground">Analysez les performances de vos audits</p>
          </div>
          <div className="flex gap-2">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1month">1 mois</SelectItem>
                <SelectItem value="3months">3 mois</SelectItem>
                <SelectItem value="6months">6 mois</SelectItem>
                <SelectItem value="1year">1 an</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Exporter
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Audits totaux</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold flex items-center gap-2">
                <FileText className="h-6 w-6 text-audit-blue-600" />
                120
              </div>
              <p className="text-sm text-green-600 mt-1">+12% ce mois</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Taux de complétion</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-green-600" />
                92%
              </div>
              <p className="text-sm text-green-600 mt-1">+3% ce mois</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Clients actifs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold flex items-center gap-2">
                <Users className="h-6 w-6 text-purple-600" />
                45
              </div>
              <p className="text-sm text-green-600 mt-1">+8 nouveaux</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Durée moyenne</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold flex items-center gap-2">
                <Calendar className="h-6 w-6 text-amber-600" />
                12j
              </div>
              <p className="text-sm text-green-600 mt-1">-2j ce mois</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="clients">Clients</TabsTrigger>
            <TabsTrigger value="trends">Tendances</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Évolution des audits</CardTitle>
                  <CardDescription>Nombre d'audits créés et complétés par mois</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={auditsByMonth}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="audits" fill="#3b82f6" name="Créés" />
                      <Bar dataKey="completed" fill="#10b981" name="Complétés" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Répartition par type</CardTitle>
                  <CardDescription>Distribution des audits selon leur catégorie</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={auditsByType}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {auditsByType.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Durée moyenne des audits</CardTitle>
                  <CardDescription>Évolution de la durée moyenne en jours</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="avgDuration" stroke="#3b82f6" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Satisfaction client</CardTitle>
                  <CardDescription>Note moyenne de satisfaction sur 5</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[3.5, 5]} />
                      <Tooltip />
                      <Line type="monotone" dataKey="satisfaction" stroke="#10b981" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Métriques de performance</CardTitle>
                <CardDescription>Indicateurs clés de performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">96%</div>
                    <div className="text-sm text-muted-foreground">Audits livrés à temps</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">4.6/5</div>
                    <div className="text-sm text-muted-foreground">Note de qualité</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">8.5j</div>
                    <div className="text-sm text-muted-foreground">Délai moyen de livraison</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="clients" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Top clients</CardTitle>
                <CardDescription>Clients les plus actifs par nombre d'audits</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Société ABC", audits: 15, revenue: "€45,000" },
                    { name: "TechCorp Inc.", audits: 12, revenue: "€36,000" },
                    { name: "Global Solutions", audits: 10, revenue: "€30,000" },
                    { name: "Innovation Ltd.", audits: 8, revenue: "€24,000" },
                    { name: "Digital Services", audits: 6, revenue: "€18,000" }
                  ].map((client, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="font-medium">{client.name}</div>
                        <div className="text-sm text-muted-foreground">{client.audits} audits</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{client.revenue}</div>
                        <div className="text-sm text-muted-foreground">Revenus</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Tendances et prévisions</CardTitle>
                <CardDescription>Analyse des tendances et projections</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Tendances observées</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Augmentation de 25% des audits de sécurité</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Réduction de 15% des délais moyens</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-blue-600" />
                        <span className="text-sm">Croissance de la satisfaction client</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Recommandations</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-sm bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs">Action</span>
                        <span className="text-sm">Augmenter la capacité pour les audits RGPD</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-sm bg-green-100 text-green-600 px-2 py-1 rounded text-xs">Succès</span>
                        <span className="text-sm">Maintenir les processus d'optimisation actuels</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-sm bg-amber-100 text-amber-600 px-2 py-1 rounded text-xs">Attention</span>
                        <span className="text-sm">Surveiller la charge de travail Q4</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AnalyticsPage;